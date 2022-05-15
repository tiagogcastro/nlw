import React from 'react';
import { BrowserRouter, Navigate, Route, Routes as ReactRoutesDom } from 'react-router-dom';

import {Landing} from './pages/Landing';

import {OrphanagesMap} from './pages/OrphanagesMap';
import {Orphanage} from './pages/Orphanage';
import {CreateOrphanage} from './pages/CreateOrphanage';

export function Routes() {
	return (
		<BrowserRouter>
			<ReactRoutesDom>
				<Route path="/" element={<Landing />} />

				<Route path="orphanages" >
					<Route path="" element={<OrphanagesMap />}/>
					<Route path="create" element={<CreateOrphanage />} />
					<Route path=":id" element={<Orphanage />} />
				</Route>

				<Route path="*" element={<Navigate to="/orphanages" />} />
			</ReactRoutesDom>
		</BrowserRouter>
	);
}
