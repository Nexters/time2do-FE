import { useNavigate } from 'react-router-dom'
import EditIcon from '../../assets/svg/EditIcon'
import { useModal } from '../../hooks/useModal'
import { LoginModal } from '../modals/LoginModal'
import { QuitConfirmModal } from '../timer/modals/QuitConfirmModal'
import { TimerTitleChangeModal } from '../timer/modals/TimerTitleChangeModal'
import { TimerButtons } from '../timer/TimerButtons'
import { TimerDisplayedNumbers } from '../timer/TimerDisplayedNumbers'
import ModalPortal from './../ModalPortal'
import { useLocalStorageSyncedCountUpTimer } from '../../hooks/useLocalStorageSyncedUpTimer'
import { useEffect, useState } from 'react'
import { UpTimer } from '../../types'
import { db } from '../../models/db'
import ReportIcon from '../../assets/svg/ReportIcon'
import { SECONDS_PER_DAY } from '@/consts/time'
import { AbuseAlertModal } from '../timer/modals/AbuseAlertModal'

export const CountUpHeader = () => {
  const navigate = useNavigate()
  const [timerName, setTimerName] = useState<string>('타이머 이름')
  const { modalName, openModal, closeModal } = useModal<'TimerTitleChange' | 'QuitConfirm' | 'Login' | 'AbuseAlert'>()

  // const modeButtonClickHandler = () => {
  //   if (user) {
  //     navigate('/countdown')
  //     return
  //   }
  //   openModal('Login')
  // }

  const reportButtonClickHandler = () => {
    navigate('/report')

    // if (user) {
    //   navigate('/report')
    //   return
    // }
    // openModal('Login')
  }

  function handleUpTimerReset(timer: UpTimer) {
    db.upTimers.add(timer)
  }

  const {
    timer,
    passedSeconds,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    reset,
    restart,
    resetTimerWithoutRecord,
  } = useLocalStorageSyncedCountUpTimer({
    timerName,
    onReset: handleUpTimerReset,
  })

  useEffect(() => {
    function checkTimerPassedMoreThan24Hours() {
      if (timer?.id && passedSeconds >= SECONDS_PER_DAY) return true
      return false
    }
    if (checkTimerPassedMoreThan24Hours()) {
      openModal('AbuseAlert')
      resetTimerWithoutRecord()
    }
  }, [seconds])

  console.log(timer?.name, timerName)

  useEffect(() => {
    if (timer?.name && timer.name !== timerName) setTimerName(timer.name)
    else if (!timer?.name) setTimerName('타이머 이름')
  }, [timer?.name])

  return (
    <>
      <div className="relative h-full w-full bg-[url('/img/countuptimer.png')] bg-cover bg-center text-white">
        <div className="absolute left-0 top-0 flex w-full items-center justify-end px-5 py-6">
          <button
            onClick={reportButtonClickHandler}
            className="btn-ghost btn-sm btn h-10 border-0 bg-transparent text-lg font-bold">
            <ReportIcon />
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
              {timer?.name ?? timerName ?? '타이머 이름'}
            </h1>
            <button onClick={() => openModal('TimerTitleChange')}>
              <EditIcon />
            </button>
          </div>
          <TimerButtons
            hasStarted={Boolean(timer?.id)}
            isRunning={isRunning}
            onStartClick={() => start()}
            onResetClick={() => reset()}
            onPauseClick={() => pause()}
            onRestartAfterPauseClick={() => restart()}
          />
        </div>
      </div>
      <ModalPortal onClose={closeModal} isOpened={modalName !== undefined}>
        {modalName === 'Login' && <LoginModal onClose={closeModal} onConfirm={() => navigate('/login')} />}
        {modalName === 'QuitConfirm' && <QuitConfirmModal onConfirm={() => navigate('/login')} onClose={closeModal} />}
        {modalName === 'AbuseAlert' && <AbuseAlertModal onClose={closeModal} />}
        {modalName === 'TimerTitleChange' && (
          <TimerTitleChangeModal
            name={timer?.name ?? timerName ?? '타이머 이름'}
            onClose={closeModal}
            onSubmit={newTitle => setTimerName(newTitle)}
          />
        )}
      </ModalPortal>
    </>
  )
}
