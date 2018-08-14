import React from 'react'
import { CircularProgress } from '@material-ui/core'

import './loading.css'

export const VacindoLoading = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
)
