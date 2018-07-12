import React from 'react'
import {connect} from 'react-redux'

const EmployeeStats = (props) => {
  return (
    <div>
      <div>
        <h3> Employee Profile</h3>
        <button> Edit </button>
      </div>
      <div>
        <table>
          <tr>
            <th>Job Category</th>
            <th>Total</th>
            <th>Years</th>
            <th>Female</th>
            <th>Male</th>
            <th>Open</th>
            <th>Local</th>
          </tr>
          {props.map(category => {
            return <tr key = {category.name}>
              <td>{category.name} </td>
              <td>{category.role.count} </td>
              <td>{category.role.avgYearExp} </td>
              <td>{category.role.femaleCount} </td>
              <td>{category.role.maleCount} </td>
              <td>{category.role.openReqs} </td>
              <td>%{category.role.percentLocal} </td>
            </tr>
          })}

        </table>
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  var tempCategories = state.categories
  // Go through each of the three main categories to total their data
  tempCategories.map(category => {
    var runningCount = 0
    // Reducing each of the values in the subcategories, bringing each to a total
    tempCategories.roles.reduce((totalRole, currentRole) => {
      runningCount += 1
      totalRole.count += currentRole.count
      totalRole.avgYearExp += currentRole.avgYearExp / runningCount
      totalRole.femaleCount += currentRole.femaleCount
      totalRole.maleCount += currentRole.maleCount
      totalRole.openReqs += currentRole.openReqs
      totalRole.percentLocal += currentRole.percentLocal / runningCount
    })
  })
  return {
    categories: tempCategories
  }
}

export default connect(mapStateToProps)(EmployeeStats)
