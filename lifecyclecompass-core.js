(function(root, factory){
  const core = factory();
  if(typeof module !== 'undefined' && module.exports) module.exports = core;
  root.LifecycleCompassCore = core;
})(typeof window !== 'undefined' ? window : globalThis, function(){
  const evidenceStates = {
    not_assessed: {weight:0, na:false},
    evidence: {weight:1, na:false},
    partial: {weight:0.5, na:false},
    gap: {weight:0, na:false},
    undetermined: {weight:0, na:false},
    accepted: {weight:1, na:false},
    na: {weight:0, na:true},
  };

  function stateToGate(state){
    if(state==='evidence'||state==='accepted'||state==='na') return 'pass';
    if(state==='partial') return 'attention';
    if(state==='gap') return 'fail';
    return 'undetermined';
  }

  function ringAggregate(states){
    let sumWeight=0, denominator=0, unresolved=0;
    states.forEach(state=>{
      const stateInfo = evidenceStates[state] || evidenceStates.not_assessed;
      if(stateInfo.na) return;
      denominator++;
      sumWeight += stateInfo.weight;
      if(state==='not_assessed'||state==='undetermined') unresolved++;
    });
    return {
      pct: denominator ? Math.round((sumWeight/denominator)*100) : 0,
      denom: denominator,
      unresolved,
    };
  }

  function pccpStatus(ai, modificationStrategy){
    if(modificationStrategy==='unknown') return {state:'undetermined', text:'Unable to determine — planned modification strategy not yet defined.'};
    if(modificationStrategy==='none') return {state:'not_indicated', text:'PCCP not currently indicated — no planned postmarket model modification declared.'};
    if(ai==='continuous' || ai==='adaptive') return {state:'applicable', text:'PCCP potentially applicable — continuous/adaptive AI presence combined with a planned modification strategy.'};
    if(modificationStrategy==='manual' || modificationStrategy==='periodic' || modificationStrategy==='autoglobal' || modificationStrategy==='localadaptive') return {state:'applicable', text:'PCCP potentially applicable — a locked model with a planned postmarket modification process can still warrant PCCP analysis (FD&C Act §515C is not limited to autonomously-learning systems).'};
    if(modificationStrategy==='thirdparty') return {state:'analysis_required', text:'PCCP analysis required — update behavior sits outside manufacturer direct control; manufacturer-side change-control obligations still need explicit assessment.'};
    return {state:'undetermined', text:'Unable to determine from current profile.'};
  }

  return {stateToGate, ringAggregate, pccpStatus};
});
