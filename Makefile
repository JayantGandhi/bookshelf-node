test:
	@NODE_ENV=test node_modules/mocha/bin/mocha --reporter dot ../bookstore-node-tests/*-test.js

db-seed:
	@node ./lib/models/seed/db-seed.js

db-reset:
	@node ./lib/models/seed/db-reset.js

.PHONY: test