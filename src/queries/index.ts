import gql from "graphql-tag";

export const exerciseDefinitionsQuery = gql`
  {
    exerciseDefinitions {
      id
      title
      unit
      history {
        session {
          date
        }
      }
      personalBest {
        value {
          value
        }
        setCount {
          value
        }
        totalReps {
          value
        }
        netValue {
          value
        }
        timeTaken {
          value
        }
      }
    }
  }
`;