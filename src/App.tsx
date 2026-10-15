import {Refine,} from "@refinedev/core";
import {DevtoolsPanel, DevtoolsProvider} from "@refinedev/devtools";
import {RefineKbar, RefineKbarProvider} from "@refinedev/kbar";

import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import routerProvider, {DocumentTitleHandler, UnsavedChangesNotifier,} from "@refinedev/react-router";
import {Layout} from "./components/refine-ui/layout/layout";
import {useNotificationProvider} from "./components/refine-ui/notification/use-notification-provider";
import {Toaster} from "./components/refine-ui/notification/toaster";
import {ThemeProvider} from "./components/refine-ui/theme/theme-provider";
import "./App.css";
import Dashboard from "@/pages/dashboard.tsx";
import {BookOpen, Home} from 'lucide-react'
import SubjectsList from "@/pages/subjects/List.tsx";
import SubjectsCreate from "@/pages/subjects/Create.tsx";
import {dataProviders} from "@/customeProvider/fakeData.ts";

function App() {
    return (
        <BrowserRouter>

            <RefineKbarProvider>
                <ThemeProvider>
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProviders}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "N5sHPE-YDng2U-CD8DCo",
                            }}
                            resources={[{
                                name: 'dashboard',
                                list: '/',
                                meta: {label: 'Home', icon: <Home/>}
                            }, {
                                name: 'subjects',
                                list: '/subjects',
                                create: '/subjects/create',
                                meta: {label: 'Subjects', icon: <BookOpen/>}
                            }]}

                        >
                            <Routes>
                                <Route element={
                                            <Layout>
                                               <Outlet/>
                                           </Layout>}>
                                    <Route path={'/'} element={<Dashboard/>}/>
                                    <Route path={'subjects'}>
                                        <Route index element={<SubjectsList/>}/>
                                        <Route path={'create'} element={<SubjectsCreate/>}/>
                                    </Route>
                                </Route>
                            </Routes>
                            <Toaster/>
                            <RefineKbar/>
                            <UnsavedChangesNotifier/>
                            <DocumentTitleHandler/>
                        </Refine>
                        <DevtoolsPanel/>
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
