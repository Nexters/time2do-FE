import api from '.'

export const postNewGroup = async (timerInfo: FormData) => {
  try {
    const response = await api.post(`/timers`, timerInfo)
    console.log(response)
    return response.data
  } catch (e) {
    console.log(e)
    return null
  }
}
