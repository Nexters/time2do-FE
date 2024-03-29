import OnboardingAnimation from '../components/OnboardingLotties'
import { useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../recoil/atoms'

const Onboarding = () => {
  const [dotActive, setDotActive] = useState(0)
  const [pageIndex, setPageIndex] = useState(0)
  const targetPost = useRef<HTMLDivElement>(null)
  const [user, setUser] = useRecoilState(userAtom)
  const navigate = useNavigate()
  // eslint-disable-next-line react/jsx-key
  const children = [
    // eslint-disable-next-line react/jsx-key
    <OnboardingAnimation />,
    // eslint-disable-next-line react/jsx-key
    <OnboardingAnimation.Second />,
    // eslint-disable-next-line react/jsx-key
    // <OnboardingAnimation.Third />,
    // eslint-disable-next-line react/jsx-key
    <OnboardingAnimation.Forth />,
  ]

  const changeLocalOnboardingValue = () => {
    if (user) {
      setUser({ ...user, onboarding: true })
    }
  }

  const handleScroll = (e: React.FormEvent) => {
    const currentScrollPosition = e.currentTarget.scrollLeft
    const postCount = React.Children.toArray(children).length
    const scrollWidth = e.currentTarget.scrollWidth / postCount
    setDotActive(Math.round(currentScrollPosition / scrollWidth))
    setPageIndex(Math.round(currentScrollPosition / scrollWidth))
  }

  const handleClickDot = (index: number) => {
    const postCount = React.Children.toArray(children).length
    targetPost.current?.scrollTo({
      left: (index * targetPost.current.scrollWidth) / postCount,
      behavior: 'smooth',
    })
  }

  const handleClickNext = async () => {
    if (pageIndex < children.length - 1) {
      const postCount = React.Children.toArray(children).length
      targetPost.current?.scrollTo({
        left: ((pageIndex + 1) * targetPost.current.scrollWidth) / postCount,
        behavior: 'smooth',
      })
    } else {
      changeLocalOnboardingValue()
      navigate('/')
    }
  }

  const handleSkipClickEvent = async () => {
    changeLocalOnboardingValue()
    navigate('/')
  }

  return (
    <>
      <header className="absolute z-10 flex w-full p-5">
        <div className="flex h-6">
          {React.Children.toArray(children).map((value, index) => (
            // eslint-disable-next-line react/jsx-key
            <div
              key={`lottie${index}`}
              className={`z-10 mr-2 h-2 w-2 rounded-3xl opacity-80 bg-${index === dotActive ? 'primary' : `white`}`}
              onClick={() => handleClickDot(index)}
            />
          ))}
        </div>
        <div className="w-1/2 flex-1"></div>
        <button type="button" onClick={handleSkipClickEvent} className="text-body4 font-bold text-grey-300">
          {`Skip >`}
        </button>
      </header>
      <div className="w-full">
        <div ref={targetPost} onScroll={e => handleScroll(e)} className="carousel w-full snap-mandatory">
          <div className="carousel-item w-full">
            <OnboardingAnimation />
          </div>
          <div className="carousel-item w-full">
            <OnboardingAnimation.Second />
          </div>
          {/* <div className="carousel-item w-full">
            <OnboardingAnimation.Third />
          </div> */}
          <div className="carousel-item w-full">
            <OnboardingAnimation.Forth />
          </div>
        </div>
      </div>
      <div className="p-5 text-right">
        <button className="btn-primary btn w-24 text-title2 font-bold text-white" onClick={handleClickNext}>
          {pageIndex !== children.length - 1 ? '다음' : '완료'}
        </button>
      </div>
    </>
  )
}

export default Onboarding
