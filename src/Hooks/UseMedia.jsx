import React from 'react'

const UseMedia = (media) => {
    const [match, setMatch] = React.useState(() => {
    return window.matchMedia(media).matches
  })

    React.useEffect(() => {
        function changeMatch() {
            const {matches} = window.matchMedia(media)
            setMatch(matches)
        }

        window.addEventListener('resize', changeMatch)
        return () => {
            window.removeEventListener('resize', changeMatch)
        }
     }, [media])

  return match
}

export default UseMedia