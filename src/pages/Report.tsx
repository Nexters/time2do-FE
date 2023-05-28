import { useCalendar } from '@h6s/calendar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useRecoilValue } from 'recoil'
import { getReportData, putUserNickname, syncTimeRecords, syncTodos, syncTodosAndTimeRecords } from '../api/report'
import bombCharacterImageUrl from '../assets/images/bombCharacterSingle.png'
import closeIconUrl from '../assets/svg/Close.svg'
import editIconUrl from '../assets/svg/Edit.svg'
import profileImageUrl from '../assets/svg/ReportProfileIcon.svg'
import Header from '../components/Header'
import ModalPortal from '../components/ModalPortal'
import ReportCalendar from '../components/ReportCalendar'
import { TodoList } from '../components/TodoList'
import { userAtom } from '../recoil/atoms'
import { GroupTimer, TimeRecord, Todo } from '../types'
import { getLocalStorageState } from '../utils'

// 47h0m0s -> 47:00:00
const formatTotalDuration = (totalDuration: string) => {
  const [hour, minute, second] = totalDuration.slice(0, -1).replaceAll(/h|m/g, ':').split(':')

  return `${hour.trim().padStart(2, '0')}:${minute.trim().padStart(2, '0')}:${second.trim().padStart(2, '0')}`
}

const today = new Date(new Date().toDateString())

export function Report() {
  const calendarHook = useCalendar()
  const { cursorDate } = calendarHook

  const user = useRecoilValue(userAtom)
  const userId = user?.id

  if (!userId) {
    return <Navigate to="/" replace />
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [nickname, setNickname] = useState('')

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(today)

  const selectedDateString = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null

  const { data: reportData, refetch: refetchReportData } = useQuery({
    queryKey: ['getReportData'],
    queryFn: () => getReportData({ userId, date: cursorDate }),
  })

  const nicknameMutation = useMutation({
    mutationFn: () => putUserNickname({ userId, nickname }),
    onSuccess: () => {
      setNickname('')
      closeModal()
      refetchReportData()
    },
    onError: () => {
      alert('닉네임을 변경하는 도중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })
  const localTodos = getLocalStorageState<Todo[]>('todos', '[]')
  const localTimeRecords = getLocalStorageState<TimeRecord[]>('countUpTimerRecords', '[]')
  const syncTodosMutation = useMutation({
    mutationFn: () => syncTodos({ userId, todos: localTodos }),
    onSuccess: () => {
      refetchReportData()
    },
    onError: () => {
      alert('투두를 동기화하는 도중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })

  const syncTimeRecordsMutation = useMutation({
    mutationFn: () => syncTimeRecords({ userId, timeRecords: localTimeRecords }),
    onSuccess: () => {
      refetchReportData()
    },
    onError: e => {
      console.log(e)
      alert('타이머 정보를 동기화하는 도중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })

  const syncTodosAndTimeRecordsMutation = useMutation({
    mutationFn: () => syncTodosAndTimeRecords({ userId, timeRecords: localTimeRecords, todos: localTodos }),
    onSuccess: () => {
      refetchReportData()
    },
    onError: e => {
      console.log(e)
      alert('동기화하는 도중에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    },
  })

  const totalDuration = reportData?.totalDuration ? formatTotalDuration(reportData.totalDuration) : '00:00:00'
  const todos =
    reportData?.timeBlocks && selectedDateString && reportData.timeBlocks[selectedDateString]
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
    reportData?.timeBlocks && selectedDateString && reportData.timeBlocks[selectedDateString]
      ? reportData.timeBlocks[selectedDateString].groupTimers
      : []

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

  const dateMouseEnterHandler = (date: Date) => {
    setHoveredDate(date)
  }

  const dateMouseLeaveHandler = () => {
    setHoveredDate(null)
  }

  const dateClickHandler = (date: Date) => {
    setSelectedDate(date)
  }

  useEffect(() => {
    refetchReportData()
  }, [cursorDate])

  const getDuration = (groupTimer: GroupTimer) => {
    if (!groupTimer.endTime || !groupTimer.startTime) return ''
    const diff = new Date(new Date(groupTimer.endTime).getTime() - new Date(groupTimer.startTime).getTime())
    const hours = diff.getUTCHours()
    const minutes = diff.getUTCMinutes()
    if (!hours) return `${minutes}분`
    return `${hours}시간 ${minutes}분`
  }

  return (
    <>
      <div className="bg-grey-1000">
        <div>
          <Header name="레포트" />
          <div className="flex items-center justify-between px-[1.25rem] pb-4">
            <div className="flex items-center justify-center">
              <img src={profileImageUrl} alt="프로필" />
              <p className="ml-[0.9375rem] mr-[0.625rem] text-[1.4375rem] font-semibold text-grey-200">
                {reportData?.userName || user?.userName}
              </p>
              <button className="border-none bg-none" onClick={openModal}>
                <img src={editIconUrl} alt="수정" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => syncTodosAndTimeRecordsMutation.mutate()}
                className="btn-primary btn-sm btn-circle btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
              <span className="mt-1 text-sm">동기화</span>
            </div>
          </div>
        </div>

        <div className="h-2 bg-grey-900" />

        {reportData && (
          <div className="py-[1.625rem]">
            <ReportCalendar
              useCalendarHook={calendarHook}
              timeBlocks={reportData?.timeBlocks ?? {}}
              totalDuration={totalDuration}
              hoveredDate={hoveredDate}
              selectedDate={selectedDate}
              onMouseEnterDate={dateMouseEnterHandler}
              onMouseLeaveDate={dateMouseLeaveHandler}
              onClickDate={dateClickHandler}
            />
          </div>
        )}

        {reportData && todos.length === 0 && groupTimers.length === 0 && (
          <div className="py-10 px-6 text-center">
            <img src={bombCharacterImageUrl} alt="폭탄이" className="inline-block" />
            <p className="mt-[1.25rem] text-[1.375rem] font-bold text-grey-300">이런! 아무것도 하지 않았군요?</p>
          </div>
        )}

        {todos.length > 0 && (
          <div className="py-7 px-6">
            <TodoList name="완료한 할 일 목록" todos={todos} readonly />
            {todos.length === 0 && <div className="py-12" />}
          </div>
        )}

        {groupTimers.length > 0 && (
          <div className="py-7 px-6">
            <p className="mb-4 text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">참여한 그룹 타이머</p>
            {groupTimers.map(groupTimer => (
              <div key={groupTimer.name} className="mb-3 rounded-[0.625rem] bg-[#171D25] px-[0.875rem] py-[0.875rem]">
                <div className="mb-2 flex items-center">
                  <div className="rounded-[0.375rem] bg-primary px-[0.3125rem] py-[0.1875rem] text-[0.9375rem] font-semibold leading-[140%] text-white">
                    #{groupTimer.tag}
                  </div>
                  <p className="pl-[0.5rem] text-[1.1875rem] font-medium leading-[1.4375rem] text-grey-200">
                    {groupTimer.name}
                  </p>
                </div>
                <div className="flex items-center text-[0.9375rem] font-semibold leading-[140%] text-grey-400">
                  <span>멤버 {groupTimer.participantsCount}명</span>
                  <span className="pl-[0.375rem]">
                    {format(new Date(groupTimer.displayTime), 'a h:mm', { locale: ko })} 종료
                  </span>
                </div>
                <div className="pr-[0.125rem] text-right text-[1.875rem] font-bold leading-[2.25rem] text-grey-200">
                  <span>{getDuration(groupTimer)}</span>
                </div>
              </div>
            ))}
            {groupTimers.length === 0 && <div className="py-12" />}
          </div>
        )}
      </div>

      {modalVisible && (
        <ModalPortal onClose={closeModal} isOpened={modalVisible}>
          <div className="fixed right-1/2 bottom-1/2 w-[24.25rem] translate-x-1/2 translate-y-1/2 rounded-2xl bg-grey-850 px-[0.875rem] pb-[1.125rem] pt-[2.9375rem]">
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
                className="mb-6 rounded-[0.625rem] border border-solid border-grey-800 bg-grey-900 px-[0.8125rem] pt-[1.1875rem] pb-[1.25rem] text-[1.125rem] font-medium leading-[1.3125rem] text-grey-300"
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
