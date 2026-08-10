import { Hero } from '@/components/sections/Hero'
import { Impact } from '@/components/sections/Impact'
import { Work } from '@/components/sections/Work'
import { FieldResults } from '@/components/sections/FieldResults'
import { Systems } from '@/components/sections/Systems'
import { Experience } from '@/components/sections/Experience'
import { Journey } from '@/components/sections/Journey'
import { Research } from '@/components/sections/Research'
import { Press } from '@/components/sections/Press'
import { Community } from '@/components/sections/Community'
import { Skills } from '@/components/sections/Skills'
import { Credentials } from '@/components/sections/Credentials'
import { Contact } from '@/components/sections/Contact'

export function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <Work />
      <FieldResults />
      <Systems />
      <Experience />
      <Journey />
      <Research />
      <Press />
      <Community />
      <Skills />
      <Credentials />
      <Contact />
    </>
  )
}
