import Mock from 'mockjs'
import home from './bookHome.js'
import shelf from './bookShelf.js'
import list from './bookList.js'
import flatList from './bookFlatList.js'

Mock.mock(/\/book\/home/, 'get', home)
Mock.mock(/\/book\/shelf/, 'get', shelf)
Mock.mock(/\/book\/list/, 'get', list)
Mock.mock(/\/book\/flat-list/, 'get', flatList)