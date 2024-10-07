interface User {
  id: string;
  name: string;
  email?: string;
}

// Optional fields
type OptionalUser = Partial<User>;

// Required fields
type RequiredUser = Required<User>;

// Omit fields
type OmittedUser = Omit<User, 'email'>

// Pick fields
type PickedUser = Pick<User, 'id'>

// Record fields
type RecordUser = Record<'id' | 'name', User>

// Readonly fields
type ReadonlyUser = Readonly<User>

type OptionalFlags<T> = {
  [Property in keyof T]: boolean;
}

type Type = OptionalFlags<OmittedUser>

// keyof is a keyword in Typescript to extract the key type of an object
type Listeners<T> = {
  [Property in keyof T as `on${Capitalize<string & Property>}Change`]?: (val: T[Property]) => void;
}

type GmrssBuild<T, O> = {
  [key in T as `gmrss:${string & keyof key}`]: O
}

type ContentRights = {
  propositionCode: string
  territory: string
  serviceProviderCode: string
  inclusiveGeoTerritory: string
  offerType: string
  devices: string
  downloadable: string
}

type SsBuilder<T, O, P extends string> = {
  [key in T as `${P}:${string & keyof key}`]: O
}

const ades: SsBuilder<ContentRights, string, 'gmrss'> & Partial<SsBuilder<ContentRights, number, 'mrss'>> = {
  'gmrss:devices': 'desktop',
  'gmrss:offerType': 'OFFER_TYPE_DOWNLOAD',
  'gmrss:propositionCode': 'PROPOSITION_CODE_DOWNLOAD',
  'gmrss:territory': 'TERRITORY_CODE_DOWNLOAD',
  'gmrss:serviceProviderCode': 'SERVICE_PROVIDER_CODE_DOWNLOAD',
  'gmrss:inclusiveGeoTerritory': 'INCLUSIVE_GEO_TERRITORY_CODE_DOWNLOAD',
  'gmrss:downloadable': 'DOWNLOADABLE_CODE_DOWNLOAD' }

console.log(ades)

type StringMap = { [key: string]: unknown }

function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value }
}

const merge = (user: User, overrides: OptionalUser): User => {
  return { ...user, ...overrides }
}

console.log(createStringPair('name', 'Abdul-Quddus'))
