import React, { useEffect, useRef } from "react";

export const PegaDashboard = () => {
    return(
        <div>
            <pega-embed id='theEmbed' action='openPage' pageID='pyDashboardsManager' pageClass='Data-Portal' casePage='full' appAlias='sc-sandbox' pegaServerUrl='https://sikap.pegatsdemo.com/prweb/' staticContentUrl='https://prod-cdn.constellation.pega.io/8.9.0-dev-13319/react/prod/' authService='pega' clientId='10239531876634268290'></pega-embed>
        </div>
    )
}