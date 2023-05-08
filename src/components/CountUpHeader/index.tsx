import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import { useRecoilValue } from 'recoil'

import EditIcon from '../../assets/svg/EditIcon'
import Report from '../../assets/svg/ReportIcon'
import Switch from '../../assets/svg/Switch'
import { defaultCountUpTimer } from '../../consts'
import { useCountUpTimer } from '../../hooks/useCountUpTimer'
import { useModal } from '../../hooks/useModal'
import { userAtom } from '../../recoil/atoms'
import { Timer, TimeRecord } from '../../types'
import { LoginModal } from '../modals/LoginModal'
import { QuitConfirmModal } from '../timer/modals/QuitConfirmModal'
import { TimerTitleChangeModal } from '../timer/modals/TimerTitleChangeModal'
import { TimerButtons } from '../timer/TimerButtons'
import { TimerDisplayedNumbers } from '../timer/TimerDisplayedNumbers'
import ModalPortal from './../ModalPortal'

type LocalStorageState = 'countUpTimer' | 'countUpTimerRecords' | 'countDownTimer' | 'user' | 'todos'

const getLocalStorageState = (key: LocalStorageState, defaultValue: any) => {
  return JSON.parse(localStorage.getItem(key) ?? defaultValue)
}

export const CountUpHeader = () => {
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)

  const [_timer = defaultCountUpTimer, setTimer] = useLocalStorage<Timer>('countUpTimer', defaultCountUpTimer)
  const [_timerRecords = [], setTimerRecords] = useLocalStorage<TimeRecord[]>('countUpTimerRecords', [])

  const { modalName, openModal, closeModal } = useModal<'TimerTitleChange' | 'QuitConfirm' | 'Login'>()

  const getLastTimeRecord = (timeRecords: TimeRecord[], id: number): TimeRecord | undefined => {
    const sortedTimerRecords = (timeRecords ?? [])
      .filter((timeRecord: TimeRecord) => timeRecord.timerId === id)
      .sort((a, b) => {
        const aTime = new Date(a.startTime).getTime()
        const bTime = new Date(b.startTime).getTime()
        if (aTime > bTime) {
          return -1
        }
        if (aTime < bTime) {
          return 1
        }
        return 0
      })

    const lastRecord = sortedTimerRecords?.[0]
    return lastRecord
  }

  const modeButtonClickHandler = () => {
    if (user) {
      navigate('/countdown')

      return
    }

    openModal('Login')
  }

  const reportButtonClickHandler = () => {
    if (user) {
      navigate('/report')
      return
    }

    openModal('Login')
  }

  const startTimer = () => {
    const newId = new Date().getTime()
    const timer = getLocalStorageState('countUpTimer', defaultCountUpTimer)
    const timerRecords = getLocalStorageState('countUpTimerRecords', [])
    setTimer({ ...timer, id: timer.id || newId, isRunning: true, startTime: new Date() })
    setTimerRecords([
      ...timerRecords,
      {
        id: new Date().getTime(),
        userId: timer?.makerId ?? 'LOCAL',
        timerId: timer.id || newId,
        startTime: new Date(),
        timerName: timer?.name,
      },
    ])
  }

  const resetTimer = () => {
    const timer = getLocalStorageState('countUpTimer', defaultCountUpTimer)
    const timerRecords = getLocalStorageState('countUpTimerRecords', [])
    const lastRecord = getLastTimeRecord(timerRecords, timer.id)
    if (timer?.id && isRunning) {
      setTimerRecords([
        ...(timerRecords.filter((timeRecord: TimeRecord) => timeRecord.id !== lastRecord?.id ?? 0) ?? []),
        { ...lastRecord, endTime: new Date() },
      ])
    }

    setTimer({ ...timer, id: 0, startTime: undefined, endTime: undefined, isRunning: false })

    openModal('QuitConfirm')
  }

  const pauseTimer = () => {
    const timer = getLocalStorageState('countUpTimer', defaultCountUpTimer)
    setTimer({ ...timer, isRunning: false })

    if (!timer.id) return
    const countUpTimerRecords: TimeRecord[] = getLocalStorageState('countUpTimerRecords', '[]')
    const lastRecord = getLastTimeRecord(countUpTimerRecords, timer.id)
    if (!lastRecord) return
    setTimerRecords([
      ...countUpTimerRecords.filter(timeRecord => timeRecord.id !== lastRecord?.id),
      { ...lastRecord, endTime: new Date() },
    ])
  }

  const { seconds, minutes, hours, isRunning, start, pause, reset } = useCountUpTimer({
    autoStart: false,
    onStart: startTimer,
    onPause: pauseTimer,
    onReset: resetTimer,
  })

  const [isHoveringModeButton, setIsHoveringModeButton] = useState(false)

  return (
    <>
      <div className="relative h-full w-full bg-[url('/img/countuptimer.png')] bg-cover bg-center text-white">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between px-5 py-6">
          <button
            onPointerEnter={() => setIsHoveringModeButton(true)}
            onPointerLeave={() => setIsHoveringModeButton(false)}
            onClick={modeButtonClickHandler}
            className="btn-primary btn-sm btn h-10 border-0 text-lg font-bold">
            <Switch classNames={isHoveringModeButton ? 'mr-2' : ''} />
            {isHoveringModeButton ? '그룹모드' : ''}
          </button>

          <button onClick={reportButtonClickHandler}>
            <Report />
          </button>
        </div>
        <div className="absolute bottom-0 mb-9 min-w-full text-center text-white">
          <div className="mb-3">
            <div className="mb-3">
              <TimerDisplayedNumbers hours={hours} minutes={minutes} seconds={seconds} />
            </div>
          </div>
          <div className="mb-4 flex items-center justify-center text-xl font-semibold">
            <h1 onClick={() => openModal('TimerTitleChange')} className="mr-1">
              {getLocalStorageState('countUpTimer', defaultCountUpTimer).name ?? '타이머 이름'}
            </h1>
            <button onClick={() => openModal('TimerTitleChange')}>
              <EditIcon />
            </button>
          </div>
          <TimerButtons
            hasStarted={Boolean(getLocalStorageState('countUpTimer', defaultCountUpTimer).id)}
            isRunning={getLocalStorageState('countUpTimer', defaultCountUpTimer).isRunning}
            onStartClick={() => start()}
            onResetClick={() => reset()}
            onPauseClick={() => pause()}
            onRestartAfterPauseClick={() => start()}
          />
        </div>
      </div>

      {modalName === 'TimerTitleChange' && (
        <ModalPortal onClose={closeModal} isOpened={modalName === 'TimerTitleChange'}>
          <TimerTitleChangeModal
            name={getLocalStorageState('countUpTimer', defaultCountUpTimer).name ?? '타이머 이름'}
            onClose={closeModal}
            onSubmit={newTitle =>
              setTimer({ ...getLocalStorageState('countUpTimer', defaultCountUpTimer), name: newTitle })
            }
          />
        </ModalPortal>
      )}

      {modalName === 'QuitConfirm' && (
        <ModalPortal onClose={closeModal} isOpened={modalName === 'QuitConfirm'}>
          <QuitConfirmModal onConfirm={() => navigate('/login')} onClose={closeModal} />
        </ModalPortal>
      )}

      {modalName === 'Login' && (
        <ModalPortal onClose={closeModal} isOpened={modalName === 'Login'}>
          <LoginModal onClose={closeModal} onConfirm={() => navigate('/login')} />
        </ModalPortal>
      )}
    </>
  )
}
