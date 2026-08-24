const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../lifecyclecompass-core.js');

test('critical gate states are non-compensatory', () => {
  assert.equal(core.stateToGate('gap'), 'fail');
  assert.equal(core.stateToGate('partial'), 'attention');
  assert.equal(core.stateToGate('evidence'), 'pass');
  assert.equal(core.stateToGate('not_assessed'), 'undetermined');
});

test('ring aggregation excludes not-applicable evidence', () => {
  assert.deepEqual(core.ringAggregate(['evidence', 'partial', 'na']), {
    pct: 75,
    denom: 2,
    unresolved: 0,
  });
});

test('ring aggregation tracks unresolved states', () => {
  assert.deepEqual(core.ringAggregate(['evidence', 'not_assessed', 'undetermined']), {
    pct: 33,
    denom: 3,
    unresolved: 2,
  });
});

test('PCCP considers AI presence and modification strategy independently', () => {
  assert.equal(core.pccpStatus('locked', 'manual').state, 'applicable');
  assert.equal(core.pccpStatus('none', 'manual').state, 'applicable');
  assert.equal(core.pccpStatus('continuous', 'none').state, 'not_indicated');
  assert.equal(core.pccpStatus('locked', 'thirdparty').state, 'analysis_required');
  assert.equal(core.pccpStatus('locked', 'unknown').state, 'undetermined');
});