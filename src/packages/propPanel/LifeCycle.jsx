import { useUnmount, useMount } from 'remote:glide_components/hooks'

function LifeCycle({ onMount, onUnmount, children }) {
  useMount(() => onMount())
  useUnmount(() => onUnmount())

  return children
}

export default LifeCycle
