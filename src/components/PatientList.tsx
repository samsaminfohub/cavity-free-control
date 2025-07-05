
import React, { useState } from 'react';
import { Search, Plus, Edit, Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const patients = [
    {
      id: 1,
      name: 'Marie Durand',
      age: 34,
      phone: '06 12 34 56 78',
      email: 'marie.durand@email.com',
      lastVisit: '2024-01-03',
      nextAppointment: '2024-04-03',
      status: 'Actif',
      treatments: ['Détartrage', 'Plombage'],
    },
    {
      id: 2,
      name: 'Jean Martin',
      age: 45,
      phone: '06 98 76 54 32',
      email: 'jean.martin@email.com',
      lastVisit: '2023-12-15',
      nextAppointment: '2024-01-15',
      status: 'Traitement en cours',
      treatments: ['Implant', 'Couronne'],
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      age: 28,
      phone: '06 55 44 33 22',
      email: 'sophie.bernard@email.com',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-07-05',
      status: 'Actif',
      treatments: ['Contrôle', 'Blanchiment'],
    },
    {
      id: 4,
      name: 'Pierre Leroy',
      age: 52,
      phone: '06 11 22 33 44',
      email: 'pierre.leroy@email.com',
      lastVisit: '2023-11-20',
      nextAppointment: '2024-02-20',
      status: 'Suivi',
      treatments: ['Prothèse', 'Détartrage'],
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Patients</h2>
          <p className="text-gray-600">Gérez vos patients et leurs informations</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Patient
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Rechercher un patient (nom, téléphone, email...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-gray-900">{patient.name}</CardTitle>
                  <p className="text-sm text-gray-600">{patient.age} ans</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{patient.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{patient.email}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Statut:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  patient.status === 'Actif' ? 'bg-green-100 text-green-800' :
                  patient.status === 'Traitement en cours' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {patient.status}
                </span>
              </div>

              {/* Appointments */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Dernière visite:</span>
                  <span className="font-medium">{patient.lastVisit}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Prochain RDV:</span>
                  <span className="font-medium text-blue-600">{patient.nextAppointment}</span>
                </div>
              </div>

              {/* Treatments */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Traitements:</p>
                <div className="flex flex-wrap gap-1">
                  {patient.treatments.map((treatment, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                    >
                      {treatment}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100">
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Prendre RDV
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="bg-white">
          <CardContent className="p-12 text-center">
            <p className="text-gray-500">Aucun patient trouvé pour "{searchTerm}"</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientList;
