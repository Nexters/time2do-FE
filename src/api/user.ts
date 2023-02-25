import api from '.'

export const postUser = async (userInfo: FormData) => {
  try {
    const response = await api.post(`/users`, userInfo)
    return response.data
  } catch (e) {
    console.log(e)
    return null
  }
}
