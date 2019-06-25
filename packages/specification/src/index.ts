// All possible relationships types. The values can be used for display purposes.
export const provenanceNodeRelationshipsMap = {
  'used': 'Used',
  'used-for-validation': 'Used for validation', 
  'used-for-calibration': 'Used for calibration', 
  'derived-from': 'Derived from',
  'generated-by': 'Generated by'
};

export type ProvenanceNodeRelationships = keyof typeof provenanceNodeRelationshipsMap;

export const provenanceNodeRelationships = Object.keys(provenanceNodeRelationshipsMap) as ProvenanceNodeRelationships[]; 

interface RelationshipConstraints {
  /**
   * The type of relationship.
   */
  relationship: ProvenanceNodeRelationships;

  /**
   * Whether this relationship is a one-to-ony relationship. By default, it is a one-to-many relationship.
   */
  single?: boolean;
}

type RelationshipRules = {
  [A in ProvenanceNodeType]: {
    [B in ProvenanceNodeType]?: Array<ProvenanceNodeRelationships | RelationshipConstraints>
  }
};

export const relationshipRules: RelationshipRules = {
  'model-building-activity': {
    'wet-lab-data': [
      'used-for-validation',
      'used-for-calibration',
    ],
    'simulation-data': [
      'used-for-validation',
      'used-for-calibration',
    ],
    'model': ['used'],
  },
  'model': {
    'model': [{
      relationship: 'derived-from',
      single: true,
    }],
    'model-building-activity': [{
      relationship: 'generated-by',
      single: true,
    }]
  },
  'model-exploration-activity': {
    'model': [{
      relationship: 'used',
      single: true,
    }]
  },
  'simulation-data': {
    'model-building-activity': [{
      relationship: 'generated-by',
      single: true,
    }],
    'model-exploration-activity': [{
      relationship: 'generated-by',
      single: true,
    }]
  },
  'wet-lab-data': {
    // no possible relationships
  }
};

interface ProvenanceNodeConnection {
  id: number;
  target: ProvenanceNode;
  type: ProvenanceNodeRelationships;
}

interface BaseNode {
  /**
   * The unique id.
   */ 
  id: number;

  /**
   * The connections.
   */
  connections?: ProvenanceNodeConnection[]
}

export interface ModelBuildingActivity extends BaseNode {
  /**
   * The model id. This information is what links nodes together.
   */
  modelId: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'model-building-activity';
}

export interface ModelExplorationActivity extends BaseNode {
  /**
   * The model id. This information is what links nodes together.
   */
  modelId: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'model-exploration-activity';
}

export interface ModelInformation {
  /**
   * The unique id.
   */ 
  id: number;
  
  /**
   * The model number. This number can be assigned arbitrarily. Should be an integer greater or equal to 1. 
   */
  modelNumber: number;

  /**
   * The information regarding the source of the model. For example, `Haack et al., PLoS comp. bio. 2015`.
   */
  bibInformation: string;  
}

export interface Model extends BaseNode {
  /**
   * The model id. This information is what links nodes together.
   */
  modelId: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'model';
  
  /**
   * The information associated with this model. Multiple models can have the same information given they have different version numbers. 
   */
  modelInformation: ModelInformation;

  /**
   * The version! This should start at 1 and then increment for each version. A model should never depend on a model that has a higher version number (or itself). 
   */
  version: number;
}

export interface WetLabData extends BaseNode {
  /**
   * The model id. This information is what links nodes together.
   */
  modelId: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'wet-lab-data';

  /**
   * The model information associated with this wet lab data. Only some wet lab data will come from a specific publication.
   */
  modelInformation?: ModelInformation;

  /**
   * The name of the wet lab experiment. This might be broken up into more specific information.
   */
  name: string;

  /**
   * Just extra information about the wet lab data. For example, this might contain cell line information.
   */
  information?: { [k: string]: string }
}

export interface SimulationData extends BaseNode {
  /**
   * The model id. This information is what links nodes together.
   */
  modelId: number;

  /**
   * The node identifier. Very useful since JavaScript doesn't really have classes so we use this attribute to see which type of node we have.
   */ 
  type: 'simulation-data';

  /**
   * The name of the simulation.
   */
  name: string;
}

export type ProvenanceNode = ModelBuildingActivity | ModelExplorationActivity | Model | WetLabData | SimulationData;
export type ProvenanceNodeType = ModelBuildingActivity['type'] | ModelExplorationActivity['type'] | Model['type'] | WetLabData['type'] | SimulationData['type'];

export interface ProvenanceAPI {
  '/health': {
    GET: {},
  };

  '/models/:id': {
    GET: {
      response: Model | null,
      params: {
        id: string;
      }
    },
  };

}
