import { getLocalStorage, saveBookShelf/* , getBookShelf */ } from './localStorage'
import { removeLocalForage } from './localForage.js'

// 把电子书添加到书架
export function addOrRemoveShelf(inBookShelf, book, bookList) {
  // 如果电子书存在于书架，则从书架中移除电子书
  if (!bookList) bookList = []
  if (inBookShelf) {
        bookList = bookList.filter(item => {
          if (item.type === 2) {
            item.itemList = item.itemList.filter(itemBook => {
              return itemBook.fileName !== book.fileName
            })
            return item.itemList
          } else {
            return item.title !== book.title
          }
        })
        saveBookShelf(bookList)
        // 清除电子书缓存
        removeLocalForage(book.fileName)
  } else {
    // 如果电子书不存在于书架，则添加电子书到书架
    book.type = 1
    // 把书添加到书架
    bookList = removeAddToShelf(bookList)
    bookList = [].concat(book, ...bookList)
    bookList.forEach((item, index) => {
      item.id = index + 1
    })
    bookList = appendAddToShelf(bookList)
    saveBookShelf(bookList)
  }
}

// 判断当前的电子书是否存在于书架
export function inBookShelf(bookItem, shelfList) {
  if (bookItem && shelfList) {
    // 定义一个自执行函数，将书架转为一维数组结构，并且只保留type为1的数据（type=1的为电子书）
    const flatShelf = (function flatten(arr) {
      return [].concat(...arr.map(v => v.itemList ? [v, ...flatten(v.itemList)] : v))
    })(shelfList).filter(item => item.type === 1)
    // 查找当前电子书是否存在于书架
    const book = flatShelf.filter(item => item.fileName === bookItem.fileName)
    return book && book.length > 0
  } else {
    return false
  }
}

export function flatBookList(bookList) {
  if (bookList) {
    let orgBookList = bookList.filter(item => {
      return item.type !== 3
    })
    const categoryList = bookList.filter(item => {
      return item.type === 2
    })
    categoryList.forEach(item => {
      const index = orgBookList.findIndex(v => {
        return v.id === item.id
      })
      if (item.itemList) {
        item.itemList.forEach(subItem => {
          orgBookList.splice(index, 0, subItem)
        })
      }
    })
    orgBookList.forEach((item, index) => {
      item.id = index + 1
    })
    orgBookList = orgBookList.filter(item => item.type !== 2)
    return orgBookList
  } else {
    return []
  }
}

export function findBook(fileName) {
  const bookList = getLocalStorage('shelf')
  return flatBookList(bookList).find(item => item.fileName === fileName)
}

// 一个数组中去除另一个数组
export function arrayDiff(a, b) {
    for (var i = 0; i < b.length; i++) {
      for (var j = 0; j < a.length; j++) {
        if (a[j] === b[i]) {
          a.splice(j, 1)
          j = j - 1
        }
      }
    }
  return a
}

export function goToBookDetail(vue, book) {
  vue.$router.push({
    path: '/store/detail',
    query: {
      fileName: book.fileName,
      category: book.categoryText
    }
  })
}

export function goToStoreHome(vue) {
  vue.$router.push({
    path: '/store/home'
  })
}

export function appendAddToShelf(list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function removeAddToShelf(list) {
  return list.filter(item => item.type !== 3)
}

export const flapCardList = [
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 100,
    rotateDegree: 0
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require('@/assets/images/lefa-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/lefa-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require('@/assets/images/flower-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/flower-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 96,
    rotateDegree: 0
  }
]

export const categoryList = {
  'ComputerScience': 1,
  'SocialSciences': 2,
  'Economics': 3,
  'Education': 4,
  'Engineering': 5,
  'Environment': 6,
  'Geography': 7,
  'History': 8,
  'Laws': 9,
  'LifeSciences': 10,
  'Literature': 11,
  'Biomedicine': 12,
  'BusinessandManagement': 13,
  'EarthSciences': 14,
  'MaterialsScience': 15,
  'Mathematics': 16,
  'MedicineAndPublicHealth': 17,
  'Philosophy': 18,
  'Physics': 19,
  'PoliticalScienceAndInternationalRelations': 20,
  'Psychology': 21,
  'Statistics': 22
}

export function getCategoryName(id) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}

export function categoryText(category, vue) {
  switch (category) {
    case 1:
      return vue.$t('category.computerScience')
    case 2:
      return vue.$t('category.socialSciences')
    case 3:
      return vue.$t('category.economics')
    case 4:
      return vue.$t('category.education')
    case 5:
      return vue.$t('category.engineering')
    case 6:
      return vue.$t('category.environment')
    case 7:
      return vue.$t('category.geography')
    case 8:
      return vue.$t('category.history')
    case 9:
      return vue.$t('category.laws')
    case 10:
      return vue.$t('category.lifeSciences')
    case 11:
      return vue.$t('category.literature')
    case 12:
      return vue.$t('category.biomedicine')
    case 13:
      return vue.$t('category.businessandManagement')
    case 14:
      return vue.$t('category.earthSciences')
    case 15:
      return vue.$t('category.materialsScience')
    case 16:
      return vue.$t('category.mathematics')
    case 17:
      return vue.$t('category.medicineAndPublicHealth')
    case 18:
      return vue.$t('category.philosophy')
    case 19:
      return vue.$t('category.physics')
    case 20:
      return vue.$t('category.politicalScienceAndInternationalRelations')
    case 21:
      return vue.$t('category.psychology')
    case 22:
      return vue.$t('category.statistics')
  }
}
