import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import EditIcon from '../../assets/svg/EditIcon'
import Report from '../../assets/svg/ReportIcon'
import { useModal } from '../../hooks/useModal'
import { userAtom } from '../../recoil/atoms'
import { HoveringButton } from '../HoveringButton'
import { LoginModal } from '../modals/LoginModal'
import { QuitConfirmModal } from '../timer/modals/QuitConfirmModal'
import { TimerTitleChangeModal } from '../timer/modals/TimerTitleChangeModal'
import { TimerButtons } from '../timer/TimerButtons'
import { TimerDisplayedNumbers } from '../timer/TimerDisplayedNumbers'
import ModalPortal from './../ModalPortal'
import { useLocalStorageSyncedCountUpTimer } from '../../hooks/useLocalStorageSyncedUpTimer'
import { useEffect, useState } from 'react'

export const CountUpHeader = () => {
  const navigate = useNavigate()
  const user = useRecoilValue(userAtom)
  const [timerName, setTimerName] = useState<string>('타이머 이름')

  const { modalName, openModal, closeModal } = useModal<'TimerTitleChange' | 'QuitConfirm' | 'Login'>()

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

  const { timer, seconds, minutes, hours, isRunning, start, pause, reset, restart } = useLocalStorageSyncedCountUpTimer(
    {
      timerName,
    },
  )

  useEffect(() => {
    if (timer?.name && timer.name !== timerName) setTimerName(timer.name)
    else if (!timer?.name) setTimerName('타이머 이름')
  }, [timer?.name])
  console.log(timer)
  return (
    <>
      <div className="relative h-full w-full bg-[url('/img/countuptimer.png')] bg-cover bg-center text-white">
        <div className="absolute left-0 top-0 flex w-full items-center justify-between px-5 py-6">
          <HoveringButton onClick={modeButtonClickHandler} buttonText="" buttonTextOnHover="그룹모드" />
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
              {timer?.name ?? '타이머 이름'}
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
        {modalName === 'TimerTitleChange' && (
          <TimerTitleChangeModal
            name={timer?.name ?? '타이머 이름'}
            onClose={closeModal}
            onSubmit={newTitle => setTimerName(newTitle)}
          />
        )}
      </ModalPortal>
    </>
  )
}
