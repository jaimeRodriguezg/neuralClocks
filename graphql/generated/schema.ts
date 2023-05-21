import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateSettingPomodoroInput = {
  email: Scalars['String'];
  id: Scalars['String'];
  intervals: Scalars['Int'];
  longTimer: Scalars['Int'];
  pomodoro: Scalars['Int'];
  shortTimer: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createSettingPomodoro: SettingPomodoro;
  updateSettingPomodoro: SettingPomodoro;
};


export type MutationCreateSettingPomodoroArgs = {
  createSettingPomodoroInput: CreateSettingPomodoroInput;
};


export type MutationUpdateSettingPomodoroArgs = {
  updateSettingPomodoroInput: UpdateSettingPomodoroInput;
};

export type Query = {
  __typename?: 'Query';
  settingPomodoro: SettingPomodoro;
  settingsPomodoro: Array<SettingPomodoro>;
};


export type QuerySettingPomodoroArgs = {
  id: Scalars['String'];
};

export type SettingPomodoro = {
  __typename?: 'SettingPomodoro';
  email: Scalars['String'];
  id: Scalars['String'];
  intervals: Scalars['Int'];
  longTimer: Scalars['Int'];
  pomodoro: Scalars['Int'];
  shortTimer: Scalars['Int'];
};

export type UpdateSettingPomodoroInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  intervals?: InputMaybe<Scalars['Int']>;
  longTimer?: InputMaybe<Scalars['Int']>;
  pomodoro?: InputMaybe<Scalars['Int']>;
  shortTimer?: InputMaybe<Scalars['Int']>;
};

export type CreateSettingPomodoroInputMutationVariables = Exact<{
  createSettingPomodoroInput: CreateSettingPomodoroInput;
}>;


export type CreateSettingPomodoroInputMutation = { __typename?: 'Mutation', createSettingPomodoro: { __typename?: 'SettingPomodoro', id: string, shortTimer: number, pomodoro: number, longTimer: number, intervals: number } };

export type GetSettingPomodoroQueryVariables = Exact<{
  settingPomodoroId: Scalars['String'];
}>;


export type GetSettingPomodoroQuery = { __typename?: 'Query', settingPomodoro: { __typename?: 'SettingPomodoro', id: string, shortTimer: number, pomodoro: number, longTimer: number, intervals: number } };

export type SettingPomodoroInfoFieldsFragment = { __typename?: 'SettingPomodoro', id: string, shortTimer: number, pomodoro: number, longTimer: number, intervals: number };

export const SettingPomodoroInfoFieldsFragmentDoc = gql`
    fragment SettingPomodoroInfoFields on SettingPomodoro {
  id
  shortTimer
  pomodoro
  longTimer
  intervals
}
    `;
export const CreateSettingPomodoroInputDocument = gql`
    mutation CreateSettingPomodoroInput($createSettingPomodoroInput: CreateSettingPomodoroInput!) {
  createSettingPomodoro(createSettingPomodoroInput: $createSettingPomodoroInput) {
    ...SettingPomodoroInfoFields
  }
}
    ${SettingPomodoroInfoFieldsFragmentDoc}`;
export type CreateSettingPomodoroInputMutationFn = Apollo.MutationFunction<CreateSettingPomodoroInputMutation, CreateSettingPomodoroInputMutationVariables>;

/**
 * __useCreateSettingPomodoroInputMutation__
 *
 * To run a mutation, you first call `useCreateSettingPomodoroInputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSettingPomodoroInputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSettingPomodoroInputMutation, { data, loading, error }] = useCreateSettingPomodoroInputMutation({
 *   variables: {
 *      createSettingPomodoroInput: // value for 'createSettingPomodoroInput'
 *   },
 * });
 */
export function useCreateSettingPomodoroInputMutation(baseOptions?: Apollo.MutationHookOptions<CreateSettingPomodoroInputMutation, CreateSettingPomodoroInputMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSettingPomodoroInputMutation, CreateSettingPomodoroInputMutationVariables>(CreateSettingPomodoroInputDocument, options);
      }
export type CreateSettingPomodoroInputMutationHookResult = ReturnType<typeof useCreateSettingPomodoroInputMutation>;
export type CreateSettingPomodoroInputMutationResult = Apollo.MutationResult<CreateSettingPomodoroInputMutation>;
export type CreateSettingPomodoroInputMutationOptions = Apollo.BaseMutationOptions<CreateSettingPomodoroInputMutation, CreateSettingPomodoroInputMutationVariables>;
export const GetSettingPomodoroDocument = gql`
    query GetSettingPomodoro($settingPomodoroId: String!) {
  settingPomodoro(id: $settingPomodoroId) {
    ...SettingPomodoroInfoFields
  }
}
    ${SettingPomodoroInfoFieldsFragmentDoc}`;

/**
 * __useGetSettingPomodoroQuery__
 *
 * To run a query within a React component, call `useGetSettingPomodoroQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingPomodoroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingPomodoroQuery({
 *   variables: {
 *      settingPomodoroId: // value for 'settingPomodoroId'
 *   },
 * });
 */
export function useGetSettingPomodoroQuery(baseOptions: Apollo.QueryHookOptions<GetSettingPomodoroQuery, GetSettingPomodoroQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingPomodoroQuery, GetSettingPomodoroQueryVariables>(GetSettingPomodoroDocument, options);
      }
export function useGetSettingPomodoroLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingPomodoroQuery, GetSettingPomodoroQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingPomodoroQuery, GetSettingPomodoroQueryVariables>(GetSettingPomodoroDocument, options);
        }
export type GetSettingPomodoroQueryHookResult = ReturnType<typeof useGetSettingPomodoroQuery>;
export type GetSettingPomodoroLazyQueryHookResult = ReturnType<typeof useGetSettingPomodoroLazyQuery>;
export type GetSettingPomodoroQueryResult = Apollo.QueryResult<GetSettingPomodoroQuery, GetSettingPomodoroQueryVariables>;