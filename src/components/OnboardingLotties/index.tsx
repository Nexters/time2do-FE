import React from 'react'
import Lottie from 'react-lottie'
import firstAnimationData from '../../assets/lotties/time2do-onboarding1.json'
import secondAnimationData from '../../assets/lotties/time2do-onboarding4.json'

const OnboardingAnimation = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: firstAnimationData,
  }

  return (
    <div>
      <Lottie options={options} />
    </div>
  )
}

// eslint-disable-next-line react/display-name
OnboardingAnimation.Second = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: secondAnimationData,
  }

  return (
    <div>
      <Lottie options={options} />
    </div>
  )
}

export default OnboardingAnimation
