
import React, { useState } from 'react';
import { FileText, Search, Plus, Eye, Edit, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Treatments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'en_cours' | 'termine' | 'planifie'>('all');

  const treatments = [
    {
      id: 1,
      patient: 'Marie Durand',
      type: 'Implant dentaire',
      startDate: '2024-01-03',
      endDate: '2024-03-15',
      status: 'en_cours',
      progress: 60,
      nextSession: '2024-01-20',
      cost: 1200,
      notes: 'Implant en position 36. Cicatrisation normale.',
      sessions: [
        { date: '2024-01-03', description: 'Pose de l\'implant', completed: true },
        { date: '2024-01-20', description: 'Contrôle cicatrisation', completed: false },
        { date: '2024-03-15', description: 'Pose de la couronne', completed: false },
      ]
    },
    {
      id: 2,
      patient: 'Jean Martin',
      type: 'Détartrage complet',
      startDate: '2024-01-05',
      endDate: '2024-01-05',
      status: 'termine',
      progress: 100,
      nextSession: null,
      cost: 80,
      notes: 'Détartrage réalisé. Conseils d\'hygiène donnés.',
      sessions: [
        { date: '2024-01-05', description: 'Détartrage et polissage', completed: true },
      ]
    },
    {
      id: 3,
      patient: 'Sophie Bernard',
      type: 'Traitement orthodontique',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      status: 'planifie',
      progress: 0,
      nextSession: '2024-02-01',
      cost: 3500,
      notes: 'Appareil dentaire prévu. Empreintes à réaliser.',
      sessions: [
        { date: '2024-02-01', description: 'Prise d\'empreintes', completed: false },
        { date: '2024-02-15', description: 'Pose de l\'appareil', completed: false },
      ]
    },
    {
      id: 4,
      patient: 'Pierre Leroy',
      type: 'Couronne céramique',
      startDate: '2023-12-20',
      endDate: '2024-01-15',
      status: 'en_cours',
      progress: 75,
      nextSession: '2024-01-15',
      cost: 600,
      notes: 'Couronne en cours de fabrication au laboratoire.',
      sessions: [
        { date: '2023-12-20', description: 'Préparation de la dent', completed: true },
        { date: '2024-01-02', description: 'Prise d\'empreinte', completed: true },
        { date: '2024-01-15', description: 'Pose de la couronne', completed: false },
      ]
    },
  ];

  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         treatment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || treatment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'bg-blue-100 text-blue-800';
      case 'termine': return 'bg-green-100 text-green-800';
      case 'planifie': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'planifie': return 'Planifié';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Traitements</h2>
          <p className="text-gray-600">Suivez l'évolution des traitements de vos patients</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Traitement
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Rechercher un traitement ou un patient..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'Tous' },
                { key: 'en_cours', label: 'En cours' },
                { key: 'planifie', label: 'Planifiés' },
                { key: 'termine', label: 'Terminés' },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={filterStatus === filter.key ? 'default' : 'outline'}
                  onClick={() => setFilterStatus(filter.key as any)}
                  size="sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatments List */}
      <div className="space-y-4">
        {filteredTreatments.map((treatment) => (
          <Card key={treatment.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{treatment.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(treatment.status)}`}>
                      {getStatusLabel(treatment.status)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">Patient: <span className="font-medium">{treatment.patient}</span></p>
                  <p className="text-sm text-gray-500">
                    Début: {treatment.startDate} • Fin prévue: {treatment.endDate} • Coût: {treatment.cost}€
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar */}
              {treatment.status === 'en_cours' && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm text-gray-600">{treatment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${treatment.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Next Session */}
              {treatment.nextSession && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Prochaine séance: {treatment.nextSession}
                    </span>
                  </div>
                </div>
              )}

              {/* Sessions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Séances:</h4>
                <div className="space-y-2">
                  {treatment.sessions.map((session, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <div className={`w-3 h-3 rounded-full ${
                        session.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-gray-600">{session.date}</span>
                      <span className={session.completed ? 'text-gray-900' : 'text-gray-500'}>
                        {session.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {treatment.notes && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Notes: </span>
                    {treatment.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTreatments.length === 0 && (
        <Card className="bg-white">
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun traitement trouvé</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Treatments;
