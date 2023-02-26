import { putUser } from '../api/user'
import OnboardingAnimation from '../components/OnboardingLotties'

const Onboarding = () => {
  const userInfo = localStorage.getItem('user')
  const userId = JSON.parse(userInfo as string).id
  const handleClickEvent = async () => {
    const response = await putUser({
      userId: userId,
      data: {
        onBoarding: true,
      },
    })
    console.log(response)
    return response
  }
  return (
    <>
      <button type={'button'} onClick={handleClickEvent}>
        skip
      </button>
      <OnboardingAnimation />
      <OnboardingAnimation.Second />
    </>
  )
}

export default Onboarding
