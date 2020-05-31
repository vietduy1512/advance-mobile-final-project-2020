const bookmarkListCourses = [
  {
    id: 1,
    title: 'React Native',
    author: 'Duy Le',
    level: 'Advance',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/react-js-getting-started-v2.png'),
  },
  {
    id: 2,
    title: 'Android',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/software-development.jpg'),
  },
  {
    id: 3,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
  {
    id: 4,
    title: 'React Native',
    author: 'Duy Le',
    level: 'Advance',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/react-js-getting-started-v2.png'),
  },
  {
    id: 5,
    title: 'Android',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/software-development.jpg'),
  },
  {
    id: 6,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
  {
    id: 7,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
]

const courses = [
  {
    id: 1,
    title: 'React Native',
    author: 'Duy Le',
    level: 'Advance',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/react-js-getting-started-v2.png'),
  },
  {
    id: 2,
    title: 'Android',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/software-development.jpg'),
  },
  {
    id: 3,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
  {
    id: 4,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
  {
    id: 5,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
  {
    id: 6,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
  {
    id: 7,
    title: 'iOS',
    author: 'Thao Luu',
    level: 'Beginner',
    released: 'May 6, 2020',
    duration: '30h',
    reviews: 123,
    image: require('assets/images/mockup/ios-collection-views-getting-started-v1.png'),
  },
]

const paths = [
  {
    id: 1, // Have Scott & Deborah
    title: 'React Native',
    coursesAmount: '4 courses',
    image: require('assets/images/mockup/react.png'),
    courseIds: [1, 2, 3, 4],
  },
  {
    id: 2,
    title: 'Android',
    coursesAmount: '1 courses',
    image: require('assets/images/mockup/android.png'),
    courseIds: [5],
  },
  {
    id: 3,
    title: 'iOS',
    coursesAmount: '2 courses',
    image: require('assets/images/mockup/ios.png'),
    courseIds: [6, 7],
  },
]

const authors = [
  {
    id: 1,  // React Native
    name: 'Scott Allen',
    coursesAmount: '3 courses',
    image: require('assets/images/mockup/scott-allen.jpg'),
    courseIds: [1, 2, 3],
  },
  {
    id: 2,  // React Native
    name: 'Deborah Kurata',
    coursesAmount: '1 courses',
    image: require('assets/images/mockup/deborah-kurata.jpg'),
    courseIds: [4],
  },
  {
    id: 3,  // Android
    name: 'Cody House',
    coursesAmount: '1 courses',
    image: require('assets/images/mockup/cory-house.jpg'),
    courseIds: [5],
  },
  {
    id: 4,  // iOS
    name: 'Don Robins',
    coursesAmount: '2 courses',
    image: require('assets/images/mockup/don-robins.jpeg'),
    courseIds: [6, 7],
  },
]

export default mockupData = {
  bookmarkListCourses: bookmarkListCourses,
  courses: courses,
  paths: paths,
  authors: authors
}