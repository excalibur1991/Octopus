// FILTERS


export const searchFilter = (checkList, filter_text) => {
    if (checkList) {
      const filteredItems = filter_text === '' ? checkList : checkList.filter(
        (item) =>
          item.slice(0, filter_text.length).toLocaleLowerCase().includes(filter_text)
        )
      const shuffled = filteredItems.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      
      setOptions(selected) // local
    }
}

export const profanityFilter = (badWords, filter_text) => {
    const filteredItems = badWords.filter((item) =>item.toLocaleLowerCase() === filter_text)

    if (filteredItems.length === 0) {
        return true
    } else {
        return false
    }
}