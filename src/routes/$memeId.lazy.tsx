import { createLazyFileRoute } from '@tanstack/react-router'
import MemeDetail from '../components/MemeDetail'

export const Route = createLazyFileRoute('/$memeId')({
  component: () => <MemeDetail />
})