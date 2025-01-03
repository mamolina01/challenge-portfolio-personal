import { getCurrencies } from '@/actions/get-currencies'
import { MainPage } from '@/components/mainPage'

export default async function Home() {
  const { data } = await getCurrencies()

  return <MainPage currencies={data} />
}
