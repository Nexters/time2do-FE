import React from 'react'
import Lottie from 'react-lottie'
import firstAnimationData from '../../assets/lotties/time2do-onboarding1.json'
import secondAnimationData from '../../assets/lotties/time2do-onboarding2.json'
import thirdAnimationData from '../../assets/lotties/time2do-onboarding3.json'
import forthAnimationData from '../../assets/lotties/time2do-onboarding4.json'

const OnboardingAnimation = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: firstAnimationData,
  }

  return (
    <div className="w-full">
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
    <div className="w-full">
      <Lottie options={options} />
    </div>
  )
}

// eslint-disable-next-line react/display-name
OnboardingAnimation.Third = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: thirdAnimationData,
  }

  return (
    <div className="w-full">
      <Lottie options={options} />
    </div>
  )
}

// eslint-disable-next-line react/display-name
OnboardingAnimation.Forth = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: forthAnimationData,
  }

  return (
    <div className="w-full">
      <Lottie options={options} />
    </div>
  )
}

export default OnboardingAnimation
