const data =  [
  {
    "node": {
      "slug": "going-on-holiday",
      "title": "Going on holiday",
      "metaDescription": "Understand your holiday allowance and how to book time off, plus how compassionate, carers leave and sabbaticals work. ",
      "parentPage": null
    }
  },
  {
    "node": {
      "slug": "grievance",
      "title": "Grievance",
      "metaDescription": "How we deal with behaviour that falls below our standards, and what to do if you want to complain about a colleague. ",
      "parentPage": null
    }
  },
  {
    "node": {
      "slug": "parental-leave",
      "title": "Parental leave",
      "metaDescription": "When to tell your manager if you’re pregnant, how maternity and paternity leave work, and how to share paternal leave.",
      "parentPage": null
    }
  },
  {
    "node": {
      "slug": "pay-money",
      "title": "Pay and money",
      "metaDescription": "When we get paid, making sense of payslips, changing your bank details, P60s and P45s, problems with pay, working overtime and how our pay is calculated.",
      "parentPage": null
    }
  },
  {
    "node": {
      "slug": "time-off-sick",
      "title": "Time off sick",
      "metaDescription": "What to do if you’re ill today, doctor’s appointments, pay when you’re off work, how we manage long term illness and frequent illness. ",
      "parentPage": null
    }
  },
  {
    "node": {
      "slug": "long-term-illness",
      "title": "Long term illness",
      "metaDescription": "Long term illnessLong term illnessLong term illness",
      "parentPage": {
        "slug": "time-off-sick"
      }
    }
  },
  {
    "node": {
      "slug": "frequent-illness",
      "title": "Frequent illness",
      "metaDescription": "Frequent illness",
      "parentPage": {
        "slug": "time-off-sick"
      }
    }
  },
  {
    "node": {
      "slug": "if-youre-ill-during-your-holiday",
      "title": "If you're ill during your holiday",
      "metaDescription": "If you're ill during your holidayIf you're ill during your holidayIf you're ill during your holiday",
      "parentPage": {
        "slug": "going-on-holiday"
      }
    }
  },
  {
    "node": {
      "slug": "pay-when-youre-ill",
      "title": "Pay when you're ill",
      "metaDescription": "Pay when you're ill Pay when you're ill Pay when you're ill Pay when you're ill",
      "parentPage": {
        "slug": "time-off-sick"
      }
    }
  },
  {
    "node": {
      "slug": "overtime",
      "title": "Overtime",
      "metaDescription": "Overtime",
      "parentPage": {
        "slug": "pay-money"
      }
    }
  },
  {
    "node": {
      "slug": "p45-and-p60-forms",
      "title": "P45 and P60 forms",
      "metaDescription": "P45 and P60 formsP45 and P60 forms",
      "parentPage": {
        "slug": "pay-money"
      }
    }
  },
  {
    "node": {
      "slug": "compassionate-leave",
      "title": "Compassionate leave",
      "metaDescription": "Compassionate leave",
      "parentPage": {
        "slug": "other-leave"
      }
    }
  },
  {
    "node": {
      "slug": "sabbatical",
      "title": "Sabbatical",
      "metaDescription": "SabbaticalSabbaticalS abbaticalSabbatical",
      "parentPage": {
        "slug": "other-leave"
      }
    }
  },
  {
    "node": {
      "slug": "how-much-youre-allowed",
      "title": "How much you're allowed",
      "metaDescription": "How much you're allowedHow much you're allowedHow much you're allowedHow much you're allowedHow much you're allowedHow much you're allowedHow much you're allowed",
      "parentPage": {
        "slug": "going-on-holiday"
      }
    }
  },
  {
    "node": {
      "slug": "public-holidays",
      "title": "Public holidays",
      "metaDescription": "Public holidaysPublic holidaysPublic holidaysPublic holidaysPublic holidays",
      "parentPage": {
        "slug": "going-on-holiday"
      }
    }
  },
  {
    "node": {
      "slug": "other-leave",
      "title": "Other leave",
      "metaDescription": "Other leaveOther leaveOther leaveOther leaveOther leaveOther leaveOther leaveOther leaveOther leaveOther leave",
      "parentPage": {
        "slug": "going-on-holiday"
      }
    }
  },
  {
    "node": {
      "slug": "payslips",
      "title": "Payslips",
      "metaDescription": "Payslips",
      "parentPage": {
        "slug": "pay-money"
      }
    }
  },
  {
    "node": {
      "slug": "buying-more-holiday",
      "title": "Buying more holiday",
      "metaDescription": "Buying more holidayBuying more holidayBuying more holiday",
      "parentPage": {
        "slug": "going-on-holiday"
      }
    }
  },
  {
    "node": {
      "slug": "carers-leave",
      "title": "Carers' leave",
      "metaDescription": "Carers' leave",
      "parentPage": {
        "slug": "other-leave"
      }
    }
  },
  {
    "node": {
      "slug": "carers-leavecarers-leavecarers-leave",
      "title": "carers-leavecarers-leavecarers-leavecarers-leave",
      "metaDescription": "carers-leavecarers-leavecarers-leavecarers-leavecarers-leavecarers-leavecarers-leave",
      "parentPage": {
        "slug": "buying-more-holiday"
      }
    }
  },
  {
    "node": {
      "slug": "carers-leavecarers-leavecarers-leavecarers-leavecarers-leavecarers-leave",
      "title": "carers-leavecarers-leavecarers-leavecarers-leave",
      "metaDescription": "leavecarers-leave",
      "parentPage": {
        "slug": "buying-more-holiday"
      }
    }
  }
]


let arr = []

let topLevel = data.filter(post => post.node.parentPage === null).map(post => post.node.slug)
let secondLevel = []
let thirdLevel = []

data.forEach((post, index) => {
  if (post.node.parentPage === null ) {
    arr.push(post)
    return
  }

  if (post.node.parentPage !== null && post.node.parentPage.slug) {

    let fullSlug = `${post.node.parentPage.slug}/${post.node.slug}`
    if (topLevel.includes(post.node.parentPage.slug)) {
      secondLevel.push({
        slug: post.node.slug,
        index: index,
        parent: post.node.parentPage.slug,
        fullSlug: fullSlug
      })

      post.node.slug = fullSlug
      arr.push(post)
      return
    }

    thirdLevel.push({
      slug: post.node.slug,
      index: index,
      parent: post.node.parentPage.slug,
      fullSlug: fullSlug
    })
  }
})

let xxxx = []

thirdLevel.forEach((post, index) => {


  let g = secondLevel.filter(v => {
    return post.parent === v.slug
  })

console.log(post.fullSlug, post.parent)

  // g.map(v => {
    
  //   // console.log(`${h}/${post.parent}`)
  //   v['squinch'] = `${v.fullSlug}/${post.slug}`

  //   return v
  // })


  // console.log(g)

  // xxxx.push(g)
})

// console.log(xxxx)




