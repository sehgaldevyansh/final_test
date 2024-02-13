/* v8 ignore start */
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ModelList from './pages/Creator/ModelList/ModelList'
import CreateModel from './pages/Creator/CreateModel/CreateModel'
// import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import CreateModalUpload from './pages/Creator/CreateModelUpload/CreateModelUpload'
import ViewModal from './pages/Creator/ViewModal/ViewModal'
import FileUploader from './pages/Creator/CreateModelUpload/FileUploader'
import ViewTimeLine from './pages/Creator/ViewDcms/ViewTimeLine'
import FillerModellist from './pages/Filler/FillerModellist/FillerModellist'
// import FillerActivityFilling from './pages/Filler/FillerActivityFilling/FillerActivityFilling'
// import FillerGeneralInfo from './pages/Filler/FillerSidebar/FillerGeneralInfo'
// import FillerBlockVariantMapping from './pages/Filler/FillerBlockVariantMapping/FillerBlockVariantMapping'
// import FillerPreview from './pages/Filler/FillerPreview/FillerPreview'
import FillerComment from './pages/Filler/FillerComment/FillerComment'
import FillerMain from './pages/Filler/FillerMain/FillerMain'
import LandingPage from './pages/LandingPage/LandingPage'
import FillerDashboard from './pages/Filler/FillerDashboard/FillerDashboard'
import PrivateRoutes from '../utils/PrivateRoutes'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
          <Route path='/creator/modellist' element={<ModelList />} />
          <Route path='/creator/createmodel' element={<CreateModel />} />
          

          <Route path='/upload' element={<CreateModalUpload />} />
          <Route path='/upload/:id' element={<CreateModalUpload />} />
          <Route path='/upload/:type/:id' element={<CreateModalUpload />} />
          <Route path='/upload/temp' element={<FileUploader />} />
          <Route path='/model/:id' element={<ViewModal />} />
          <Route path='/model/:type/:id' element={<ViewModal />} />
          <Route path='dcms' element={<ViewTimeLine />} />
          <Route path='dcms/:type' element={<ViewTimeLine />} />
          {/* Filler Routes */}
          {/* <Route path='/filler/blockvariantmapping' element={<FillerBlockVariantMapping />} /> */}
          <Route path='/filler/modellist' element={<FillerModellist />} />
          <Route path='/comment/:id' element={<FillerComment />} />
          <Route path='/dashboard' element={<FillerDashboard />} />
          <Route path='/filler' element={<FillerMain />} />
          <Route path='/filler/:id' element={<FillerMain />} />
          </Route>
          <Route path='/home' element={<LandingPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/logout' element={<LoginPage />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App


/* v8 ignore stop */
