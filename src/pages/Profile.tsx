import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCalendar } from '@h6s/calendar'
import { format } from 'date-fns'
import Header from '../components/Header'
import ReportCalendar from '../components/ReportCalendar'
import { TodoList } from '../components/TodoList'
import profileImageUrl from '../assets/svg/Profile.svg'
import profileIconUrl from '../assets/svg/ProfileIcon.svg'
import editIconUrl from '../assets/svg/Edit.svg'
import closeIconUrl from '../assets/svg/Close.svg'
import { getReportData, putUserNickname } from '../api/report'
import { ko } from 'date-fns/locale'
import ModalPortal from '../components/ModalPortal'
import { useTodoList } from '@/hooks/useTodoList'
import { useUpTimerReport } from '@/hooks/useUpTimerReport'

// 47h0m0s -> 47:00:00
const formatTotalDuration = (totalDuration: string) => {
  const [hour, minute, second] = totalDuration.slice(0, -1).replaceAll(/h|m/g, ':').split(':')

  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
}

const userId = 0

const today = new Date(new Date().toDateString())

export function Report() {
  const calendarHook = useCalendar()
  const { cursorDate } = calendarHook
  const { timersAndAggregationAtDates } = useUpTimerReport()
  const { todoList } = useTodoList()

  const [modalVisible, setModalVisible] = useState(false)
  const [nickname, setNickname] = useState('')

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(today)

  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null

  const nicknameMutation = useMutation({
    mutationFn: () => putUserNickname({ userId, nickname }),
    onSuccess: () => {
      setNickname('')
    },
    onError: () => {
      alert('닉네임을 변경하는 도중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })
  const { data: reportData } = useQuery({
    queryKey: ['getReportData'],
    queryFn: () => getReportData({ userId, date: cursorDate }),
  })

  const totalDuration = reportData?.totalDuration ? formatTotalDuration(reportData.totalDuration) : '00:00:00'
  const todos =
    reportData?.timeBlocks && selectedDateString
      ? reportData.timeBlocks[selectedDateString].toDos.map(toDo => ({
          id: toDo.id,
          userId: toDo.userId,
          content: toDo.content,
          completed: true,
          createdTime: new Date(toDo.createdTime),
          completedTime: toDo.completedTime ? new Date(toDo.completedTime) : undefined,
        }))
      : []
  const groupTimers =
    reportData?.timeBlocks && selectedDateString ? reportData.timeBlocks[selectedDateString].groupTimers : []

  const openModal = () => {
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const nicknameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value)
  }

  const nicknameSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    nicknameMutation.mutate()
  }

  const dateClickHandler = (date: Date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <div className="bg-grey-1000">
        <div>
          <Header name="레포트" />
          <div className="flex items-center px-[1.25rem] pb-4">
            <img src={profileImageUrl} alt="프로필" />
            <p className="ml-[0.9375rem] mr-[0.625rem] text-[1.4375rem] font-semibold text-grey-200">
              {reportData?.userName ?? ''}
            </p>
            <button className="border-none bg-none" onClick={openModal}>
              <img src={editIconUrl} alt="수정" />
            </button>
          </div>
        </div>
        <div className="h-2 bg-grey-900" />
        {reportData && (
          <div className="py-[1.625rem]">
            <ReportCalendar
              timersAndAggregationAtDates={timersAndAggregationAtDates}
              totalDuration={totalDuration}
              selectedDate={selectedDate}
              onClickDate={dateClickHandler}
            />
          </div>
        )}

        {todos.length > 0 && (
          <div className="px-6 py-7">
            <TodoList name="완료한 할 일 목록" todos={todoList} readonly />
            {todos.length === 0 && <div className="py-12" />}
          </div>
        )}

        {groupTimers.length > 0 && (
          <div className="px-6 py-7">
            <p className="mb-4 text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">참여한 그룹 타이머</p>
            {groupTimers.map(groupTimer => (
              <div key={groupTimer.name} className="rounded-[0.625rem] bg-grey-900 px-4 py-4">
                <div className="mb-1 flex items-center">
                  <div className="rounded-3xl bg-grey-1000 px-2 py-[0.3125rem] text-[0.9375rem] font-semibold leading-[1.125rem] text-grey-200 backdrop-blur-[7.5px]">
                    #{groupTimer.tag}
                  </div>
                  <p className="pl-[0.375rem] text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">
                    {groupTimer.name}
                  </p>
                </div>
                <div className="flex items-center text-[1.0625rem] font-bold leading-[1.25rem] text-grey-400">
                  <img src={profileIconUrl} alt="인원수" />
                  <span className="pl-[0.125rem]">{groupTimer.participantsCount}</span>
                  <span className="pl-[0.375rem]">
                    {format(new Date(groupTimer.displayTime), 'a h시 m분', { locale: ko })}
                  </span>
                </div>
                <div className="pr-[0.625rem] text-right text-[1.875rem] font-bold leading-[2.25rem] text-grey-200">
                  <span>3시간</span>
                </div>
              </div>
            ))}
            {groupTimers.length === 0 && <div className="py-12" />}
          </div>
        )}
      </div>
      {modalVisible && (
        <ModalPortal onClose={closeModal} isOpened={modalVisible}>
          <div className="fixed bottom-1/2 right-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[0.875rem] pb-[1.125rem] pt-[2.9375rem]">
            <div className="absolute right-[0.875rem] top-[0.875rem]">
              <button>
                <img src={closeIconUrl} alt="닫기" onClick={closeModal} />
              </button>
            </div>
            <form className="flex flex-col" onSubmit={nicknameSubmitHandler}>
              <label
                htmlFor="nickname"
                className="mb-[0.625rem] text-[0.875rem] font-bold leading-[0.875rem] text-grey-300">
                닉네임 변경
              </label>
              <input
                type="text"
                id="nickname"
                className="mb-6 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-[0.8125rem] pb-[1.25rem] pt-[1.1875rem] text-[1.125rem] font-medium leading-[1.3125rem] text-grey-300"
                value={nickname}
                onChange={nicknameChangeHandler}
                autoFocus
              />
              <button className="width-full rounded-[0.625rem] bg-primary py-[1.125rem] text-[1.25rem] font-semibold leading-[1.5rem] text-white">
                완료
              </button>
            </form>
          </div>
        </ModalPortal>
      )}
      <div id="root-modal" className="absolute left-0 top-0" />
    </>
  )
}
