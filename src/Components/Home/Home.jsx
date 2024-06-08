import React from 'react'
import Hero from '../Hero/Hero'
import OurClient from '../OurClient/OurClient'
import TredingProduct from '../TradingProduct/TredingProduct'
import BestSell from '../BestSell/BestSell'
import NewCollectionBanner from '../NewCollectionBanner/NewCollectionBanner'
import CollectionBanner from '../CollectionBanner/CollectionBanner'
import WhyChoose from '../WhyChoose/WhyChoose'

function Home() {
  return (
    <>
      <Hero />
      <OurClient />
      <TredingProduct />
      <NewCollectionBanner />
      <BestSell />
      <CollectionBanner />
      <WhyChoose />
    </>
  )
}

export default Home
