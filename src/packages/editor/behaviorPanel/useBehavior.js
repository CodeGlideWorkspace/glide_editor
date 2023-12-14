function useBehavior({ eventDefinitions, apiDefinitions, components, scripts }) {
  const eventOptions = eventDefinitions.map((event) => {
    return { label: event.label, value: event.name }
  })

  const apiOptions = apiDefinitions.map((api) => {
    return { label: api.label, value: api.name }
  })

  return { eventOptions, apiOptions, componentOptions: components, scriptOptions: scripts }
}

export default useBehavior
