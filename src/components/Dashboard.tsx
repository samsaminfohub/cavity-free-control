
import React from 'react';
import { Users, Calendar, TrendingUp, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: 'Patients total',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'RDV aujourd\'hui',
      value: '8',
      change: '2 en attente',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      title: 'Revenus du mois',
      value: '€12,450',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'Taux occupation',
      value: '85%',
      change: 'Très bon',
      icon: Clock,
      color: 'bg-orange-500',
    },
  ];

  const appointments = [
    { time: '09:00', patient: 'Marie Durand', type: 'Contrôle', status: 'confirmed' },
    { time: '10:30', patient: 'Jean Martin', type: 'Détartrage', status: 'waiting' },
    { time: '11:15', patient: 'Sophie Bernard', type: 'Implant', status: 'confirmed' },
    { time: '14:00', patient: 'Pierre Leroy', type: 'Urgence', status: 'urgent' },
    { time: '15:30', patient: 'Anne Petit', type: 'Couronne', status: 'confirmed' },
  ];

  const recentPatients = [
    { name: 'Marie Dubois', lastVisit: '2024-01-03', nextVisit: '2024-04-03', status: 'Suivi' },
    { name: 'Thomas Lefevre', lastVisit: '2024-01-02', nextVisit: '2024-01-16', status: 'Traitement' },
    { name: 'Claire Moreau', lastVisit: '2023-12-28', nextVisit: '2024-01-28', status: 'Contrôle' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Appointments */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Rendez-vous d'aujourd'hui</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {appointments.map((apt, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-mono font-medium text-gray-600 w-12">
                      {apt.time}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{apt.patient}</p>
                      <p className="text-sm text-gray-600">{apt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {apt.status === 'confirmed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {apt.status === 'waiting' && (
                      <Clock className="h-5 w-5 text-orange-500" />
                    )}
                    {apt.status === 'urgent' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Patients récents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">
                      Dernière visite: {patient.lastVisit}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">{patient.status}</p>
                    <p className="text-xs text-gray-500">
                      Prochain RDV: {patient.nextVisit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
