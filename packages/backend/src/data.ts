import {
  Study,
  ProvenanceNode,
  uniqueId,
  InformationField,
  InformationRelationshipSchema,
  RelationshipSchema,
  Schema,
  DependencyRelationshipSchema,
  TypeOf,
  NodeDefinition,
  RelationshipRule,
  RelationshipRuleSchema,
} from 'common';

export interface Relationship<A extends Schema, B extends Schema, R extends RelationshipSchema<A, B>> {
  schema: R;
  source: TypeOf<A>;
  target: TypeOf<B>;
  properties: TypeOf<R>;
}

export const connections: Relationship<Schema, Schema, RelationshipSchema<Schema, Schema>>[] = [];
const addRelationship = <A extends Schema, B extends Schema, R extends RelationshipSchema<A, B>>(
  relationship: Relationship<A, B, R>,
) => {
  connections.push(relationship);
}

// Definitions
const model: NodeDefinition = {
  id: uniqueId(),
  name: 'Model',
  classification: 'entity',
  labelFormatString: "M${version}${study ? ' (' + study.source  + ')' : ''}",
}

const wetLabData: NodeDefinition = {
  id: uniqueId(),
  name: 'WetLabData',
  classification: 'entity',
}

const simulationData: NodeDefinition = {
  id: uniqueId(),
  name: 'SimulationData',
  classification: 'entity',
}

const modelBuildingActivity: NodeDefinition = {
  id: uniqueId(),
  name: 'ModelBuildingActivity',
  label: 'MBA',
  classification: 'activity',
}

const modelExplorationActivity: NodeDefinition = {
  id: uniqueId(),
  name: 'ModelExplorationActivity',
  label: 'MEA',
  classification: 'activity',
}

const theoreticalKnowledge: NodeDefinition = {
  id: uniqueId(),
  name: 'TheoreticalKnowledge',
  label: 'MEA',
  classification: 'activity',
}

// M1
const study1: Study = {
  id: uniqueId(),
  source: 'Lee et al., PLoS bio. 2003',
};

const WX_7: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  label: 'Wx_7',
  definitionId: wetLabData.id,
};

const WX_7_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'Xenopus egg extract',
};

addRelationship({
  schema: InformationRelationshipSchema,
  source: WX_7,
  target: WX_7_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const W1_1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  label: 'W1_1',
  definitionId: wetLabData.id,
};

const W1_1_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'Xenopus egg extract',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: W1_1,
  target: W1_1_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const W1_2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  label: 'W1_2',
  definitionId: wetLabData.id,
};

const W1_2_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'Xenopus egg extract',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: W1_2,
  target: W1_2_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const MBA_3: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  definitionId: modelBuildingActivity.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_3,
  target: WX_7,
  properties: {
    id: uniqueId(),
    type: 'Used for calibration',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_3,
  target: W1_1,
  properties: {
    id: uniqueId(),
    type: 'Used for calibration',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_3,
  target: W1_2,
  properties: {
    id: uniqueId(),
    type: 'Used for validation',
  }
})


const S1_1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  definitionId: simulationData.id,
  label: 'S1_1',
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: S1_1,
  target: MBA_3,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  },
})

const model3: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  definitionId: model.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: model3,
  target: MBA_3,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  }
})

const MEA: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  definitionId: modelExplorationActivity.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MEA,
  target: model3,
  properties: {
    id: uniqueId(),
    type: 'Used',
  }
})

const S1_2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study1.id,
  definitionId: simulationData.id,
  label: 'S1_2',
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: S1_2,
  target: MEA,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  }
})

// M12
const study12: Study = {
  id: uniqueId(),
  source: 'Haack et al., PLoS comp. bio. 2015',
};

const W12_1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  label: 'W12_1',
  definitionId: wetLabData.id,
};

const W12_1_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'hNPCs',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: W12_1,
  target: W12_1_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const WX_1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  label: 'Wx_1',
  definitionId: wetLabData.id,
};

const WX_1_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'HEK293T',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: WX_1,
  target: WX_1_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const WX_2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  label: 'Wx_2',
  definitionId: wetLabData.id,
};

const WX_2_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'Diverse cell lines (L, HIH3T3, N1E-115, nHPC, BHK, PTK2)',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: WX_2,
  target: WX_2_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

// TODO Leaving out simulationsUsedForCalibration from M1
const MBA_1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  definitionId: modelBuildingActivity.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_1,
  target: W12_1,
  properties: {
    id: uniqueId(),
    type: 'Used for calibration',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_1,
  target: WX_2,
  properties: {
    id: uniqueId(),
    type: 'Used for calibration',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_1,
  target: WX_1,
  properties: {
    id: uniqueId(),
    type: 'Used for calibration',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_1,
  target: S1_2,
  properties: {
    id: uniqueId(),
    type: 'Used for validation',
  }
})


const S12_1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  definitionId: simulationData.id,
  label: 'S12_1',
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: S12_1,
  target: MBA_1,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  }
})

const model1: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  definitionId: model.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: model1,
  target: MBA_1,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  }
})

const W12_2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  label: 'W12_2',
  definitionId: wetLabData.id,
};

const W12_2_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'hNPCs',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: W12_2,
  target: W12_2_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const W12_3: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  label: 'W12_3',
  definitionId: wetLabData.id,
};

const W12_3_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'Diverse cell lines (L, HIH3T3, N1E-115, nHPC, BHK, PTK2)',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: W12_3,
  target: W12_3_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const WX_3: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  label: 'Wx_3',
  definitionId: wetLabData.id,
};

const WX_3_INFORMATION: InformationField = {
  id: uniqueId(),
  key: 'Cell line',
  value: 'hNPCs',
}

addRelationship({
  schema: InformationRelationshipSchema,
  source: WX_3,
  target: WX_3_INFORMATION,
  properties: {
    id: uniqueId(),
  }
})

const MBA_2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  definitionId: modelBuildingActivity.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_2,
  target: WX_3,
  properties: {
    id: uniqueId(),
    type: 'Used for calibration',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_2,
  target: W12_2,
  properties: {
    id: uniqueId(),
    type: 'Used for validation',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_2,
  target: W12_3,
  properties: {
    id: uniqueId(),
    type: 'Used for validation',
  }
})

addRelationship({
  schema: DependencyRelationshipSchema,
  source: MBA_2,
  target: model1,
  properties: {
    id: uniqueId(),
    type: 'Used',
  }
})

const S12_2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  definitionId: simulationData.id,
  label: 'S12_2',
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: S12_2,
  target: MBA_2,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  }
})

const model2: ProvenanceNode = {
  id: uniqueId(),
  studyId: study12.id,
  definitionId: model.id,
};

addRelationship({
  schema: DependencyRelationshipSchema,
  source: model2,
  target: MBA_2,
  properties: {
    id: uniqueId(),
    type: 'Generated by',
  }
});

export const rules: RelationshipRule[] = [
  {
    id: uniqueId(),
    type: ['Used for calibration', 'Used for validation'],
    cardinality: 'one-to-many',
    source: modelBuildingActivity.id,
    target: wetLabData.id,
  },
  {
    id: uniqueId(),
    type: ['Used for calibration', 'Used for validation'],
    cardinality: 'one-to-many',
    source: modelBuildingActivity.id,
    target: simulationData.id,
  },
  {
    id: uniqueId(),
    type: ['Used'],
    cardinality: 'one-to-many',
    source: modelBuildingActivity.id,
    target: model.id,
  },
  {
    id: uniqueId(),
    type: ['Derived from'],
    cardinality: 'one-to-one',
    source: model.id,
    target: model.id,
  },
  {
    id: uniqueId(),
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: model.id,
    target: modelBuildingActivity.id,
  },
  {
    id: uniqueId(),
    type: ['Used'],
    cardinality: 'one-to-one',
    source: modelExplorationActivity.id,
    target: model.id,
  },
  {
    id: uniqueId(),
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: modelBuildingActivity.id,
  },
  {
    id: uniqueId(),
    type: ['Generated by'],
    cardinality: 'one-to-one',
    source: simulationData.id,
    target: modelExplorationActivity.id,
  },
]

export const definitions: NodeDefinition[] = [
  model,
  wetLabData,
  simulationData,
  modelBuildingActivity,
  modelExplorationActivity,
  theoreticalKnowledge,
]

export const nodes: ProvenanceNode[] = [
  // MODEL 12
  W12_1,
  WX_1,
  WX_2,
  MBA_1,
  S12_1,
  model1,
  W12_2,
  W12_3,
  WX_3,
  MBA_2,
  S12_2,
  model2,

  // MODEL 1
  WX_7,
  W1_1,
  W1_2,
  MBA_3,
  S1_1,
  model3,
  MEA,
  S1_2,
];

export const informationNodes: InformationField[] = [
  WX_7_INFORMATION,
  W1_1_INFORMATION,
  W1_2_INFORMATION,
  W12_1_INFORMATION,
  WX_1_INFORMATION,
  WX_2_INFORMATION,
  W12_2_INFORMATION,
  W12_3_INFORMATION,
  WX_3_INFORMATION,
]

export const studies: Study[] = [
  study1,
  study12,
];









