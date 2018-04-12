function importTest(name, path) {
  describe(name, function() {
    require(path)
  })
}

describe("Testing GraphMath", function() {
  importTest("Vector", "./types/vectors/vector.test.js")
})