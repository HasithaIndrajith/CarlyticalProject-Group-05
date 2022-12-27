import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <br></br>
            <div style = {{textAlign: 'center'}}>
            <iframe title="dashboard" width="1300" height="612" src="https://app.powerbi.com/view?r=eyJrIjoiZmNkNjlmMDctYWJiNi00NTVhLThjODUtZDFhOTJkYjRlZWRiIiwidCI6ImFhYzBjNTY0LTZjNWUtNGIwNS04ZGMzLTQwODA4N2Y3N2Y3NiIsImMiOjEwfQ%3D%3D&pageName=ReportSection" frameborder="0" allowFullScreen="true"></iframe>        </div>
    </div>
    )
}

export default Dashboard
