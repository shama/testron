process.browser = true
var test = require('tape')

test('test that tests work', function (t) {
  t.plan(1)
  var ul = document.createElement('ul')
  var li = document.createElement('li')
  ul.appendChild(li)
  li.textContent = 'it works'
  t.equal(ul.outerHTML, '<ul><li>it works</li></ul>', 'client-test should have worked')
  t.end()
})
