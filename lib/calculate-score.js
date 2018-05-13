'use strict'

const getResult = (score, count) => {
  const average = count > 0 ? score / count : 0;
  let result = 'í meðallagi'
  if (average > 3.2) {
    result = 'há'
  } else if (average < 2.8) {
    result = 'lág'
  }
  return result
}

const reduceFactors = (a, b) => {
  if (!a[b.domain]) {
    a[b.domain] = {score: 0, count: 0, result: 'í meðallagi', facet: {}}
  }

  a[b.domain].score += parseInt(b.score || 0, 10)
  if ( b.score > 0 ) {
    a[b.domain].count += 1
  }
  a[b.domain].result = getResult(a[b.domain].score, a[b.domain].count)

  if (b.facet) {
    if (!a[b.domain].facet[b.facet]) {
      a[b.domain].facet[b.facet] = {score: 0, count: 0, result: 'í meðallagi'}
    }
    a[b.domain].facet[b.facet].score += parseInt(b.score || 0, 10)
    if ( b.score > 0 ) {
      a[b.domain].facet[b.facet].count += 1
    }
    a[b.domain].facet[b.facet].result = getResult(a[b.domain].facet[b.facet].score, a[b.domain].facet[b.facet].count)
  }

  return a
}

module.exports = data => {
  if (!data) {
    return {error: 'Missing required input'}
  }

  if (!Array.isArray(data)) {
    return {error: 'Wrong format. Data must be an array'}
  }

  return data.reduce(reduceFactors, {})
}
