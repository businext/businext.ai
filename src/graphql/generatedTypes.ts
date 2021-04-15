export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BusinessInfoInput = {
  address: Scalars['String'];
  name: Scalars['String'];
};

export type BusinessInferences = {
  __typename?: 'BusinessInferences';
  servesAlcohol: BooleanInsight;
};

export type BooleanInsight = {
  __typename?: 'BooleanInsight';
  confidence: Scalars['Float'];
  evidence: EvidenceCollection;
  insight: Scalars['Boolean'];
};

export type EvidenceCollection = {
  __typename?: 'EvidenceCollection';
  images?: Maybe<Array<ImageEvidence>>;
};

export type ImageEvidence = {
  __typename?: 'ImageEvidence';
  reason: Scalars['String'];
  source: ExtractedImage;
};

export type Query = {
  __typename?: 'Query';
  getBusinessInfo: BusinessInferences;
};


export type QueryGetBusinessInfoArgs = {
  businessInfoInput: BusinessInfoInput;
};

export type Image = {
  __typename?: 'Image';
  provider: Scalars['String'];
  source: Scalars['String'];
};

export type ImageExtractionCollection = {
  __typename?: 'ImageExtractionCollection';
  assigned_labels?: Maybe<Array<AssignedLabel>>;
  detected_objects?: Maybe<Array<DetectedObject>>;
};

export type AssignedLabel = {
  __typename?: 'AssignedLabel';
  confidence: Scalars['Float'];
  description: Scalars['String'];
  topicality?: Maybe<Scalars['Float']>;
};

export type DetectedObject = {
  __typename?: 'DetectedObject';
  bounding_polygon?: Maybe<Array<Coordinate>>;
  confidence: Scalars['Float'];
  object_name: Scalars['String'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type ExtractedImage = {
  __typename?: 'ExtractedImage';
  extractions: ImageExtractionCollection;
  origin: Image;
};
