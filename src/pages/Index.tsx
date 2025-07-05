
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import PatientList from '@/components/PatientList';
import Planning from '@/components/Planning';
import Treatments from '@/components/Treatments';

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/traitements" element={<Treatments />} />
      </Routes>
    </Layout>
  );
};

export default Index;
