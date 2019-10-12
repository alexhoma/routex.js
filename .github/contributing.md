# Contributing

:tada: Thank you for being interested in contributing to this `routex.js`. Don't hesitate to [open an issue] if something is wrong or you have any questions about how to contribute. ([Issue template]) 

### 1. Setup

* Fork this repository and clone the fork. 
* Create a branch.
* Do your changes (if it's a feature, add the corresponding tests)
* Commit changes. Preferably use this nomenclature:
  * `fix`: when fixing a bug
  * `feat`: when adding an enhancement to the code 
  * `refactor`: when improving the code eithout adding a feature or fixing something
  * `chore`: for tooling changes
  * `docs`: for documentation improves
  
Add any "context" `feat(server)` to the commit message if you want. I'll give you some examples:

> * fix(client): checks undefined route arguments
> * feat(server): adds new route param
> * docs: clarifies contributing file about testing 
 

### 2. Testing

To start developing and testing just run:

```bash
npm t

# or

npm t -- --watch
```

There are other helpful commands to work with coverage, mutants and more:

```bash
npm run size      # checks bundlesize
npm run coverage  # checks the code coverage
npm run mutants   # executes striker for mutant testing
```

### 3. Release

Once you're finished just push your changes and open a pull request. Get the [pull request template].

[open an issue]: https://github.com/alexhoma/routex.js/issues/new
[issue template]: ./ISSUE_TEMPLATE.md
[pull request template]: ./PULL_REQUEST_TEMPLATE.md