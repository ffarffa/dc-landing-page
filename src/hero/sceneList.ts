// The hero animation catalogue (kept apart from the components so fast refresh works).
import { Heartbeat, Migration, Spike, Storm, Tangle } from './Scenes.tsx'

export const SCENES = [
  { id: 'tangle', label: 'Tangle → order', title: 'architecture · before → after', C: Tangle },
  { id: 'storm', label: 'Storm → clear', title: 'production · status', C: Storm },
  { id: 'spike', label: 'Traffic spike', title: 'traffic · live', C: Spike },
  { id: 'migration', label: 'Migration', title: 'migration · on-prem → cloud', C: Migration },
  { id: 'heartbeat', label: 'Heartbeat', title: 'health · monitor', C: Heartbeat },
] as const
