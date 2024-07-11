import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Resume from "./components/Resume";
import ResumePreview from "./components/ResumePreview";

function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Resume/>
    },
    {
      path:'/preview',
      element:<ResumePreview/>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
