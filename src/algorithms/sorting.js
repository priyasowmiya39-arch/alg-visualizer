// Bubble Sort
export const bubbleSort = async (arr, setArray, setComparisons, setSwaps, delay) => {
  let comparisons = 0
  let swaps = 0
  const n = arr.length
  const array = [...arr]

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      setComparisons(comparisons)

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        swaps++
        setSwaps(swaps)
      }

      setArray([...array])
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  return array
}

// Selection Sort
export const selectionSort = async (arr, setArray, setComparisons, setSwaps, delay) => {
  let comparisons = 0
  let swaps = 0
  const n = arr.length
  const array = [...arr]

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    for (let j = i + 1; j < n; j++) {
      comparisons++
      setComparisons(comparisons)

      if (array[j] < array[minIdx]) {
        minIdx = j
      }

      setArray([...array])
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]]
      swaps++
      setSwaps(swaps)
      setArray([...array])
    }
  }

  return array
}

// Insertion Sort
export const insertionSort = async (arr, setArray, setComparisons, setSwaps, delay) => {
  let comparisons = 0
  let swaps = 0
  const array = [...arr]

  for (let i = 1; i < array.length; i++) {
    const key = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > key) {
      comparisons++
      setComparisons(comparisons)

      array[j + 1] = array[j]
      swaps++
      setSwaps(swaps)
      j--

      setArray([...array])
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    array[j + 1] = key
    setArray([...array])
  }

  return array
}

// Merge Sort
export const mergeSort = async (arr, setArray, setComparisons, setSwaps, delay) => {
  let comparisons = 0
  let swaps = 0

  const merge = async (array, left, mid, right) => {
    const leftArr = array.slice(left, mid + 1)
    const rightArr = array.slice(mid + 1, right + 1)

    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++
      setComparisons(comparisons)

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i]
        i++
      } else {
        array[k] = rightArr[j]
        j++
      }

      swaps++
      setSwaps(swaps)
      k++

      setArray([...array])
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i]
      i++
      k++
      setArray([...array])
      await new Promise(resolve => setTimeout(resolve, delay))
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j]
      j++
      k++
      setArray([...array])
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  const sort = async (array, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      await sort(array, left, mid)
      await sort(array, mid + 1, right)
      await merge(array, left, mid, right)
    }
  }

  const array = [...arr]
  await sort(array, 0, array.length - 1)
  return array
}

// Quick Sort
export const quickSort = async (arr, setArray, setComparisons, setSwaps, delay) => {
  let comparisons = 0
  let swaps = 0

  const partition = async (array, low, high) => {
    const pivot = array[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      comparisons++
      setComparisons(comparisons)

      if (array[j] < pivot) {
        i++
        [array[i], array[j]] = [array[j], array[i]]
        swaps++
        setSwaps(swaps)
        setArray([...array])
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]]
    swaps++
    setSwaps(swaps)
    setArray([...array])
    await new Promise(resolve => setTimeout(resolve, delay))

    return i + 1
  }

  const sort = async (array, low, high) => {
    if (low < high) {
      const pi = await partition(array, low, high)
      await sort(array, low, pi - 1)
      await sort(array, pi + 1, high)
    }
  }

  const array = [...arr]
  await sort(array, 0, array.length - 1)
  return array
}
