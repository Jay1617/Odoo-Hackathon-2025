import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { Clock, CheckCircle, XCircle, User, Package, Star } from 'lucide-react';

const Received = () => {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');

    // Mock data for received swap requests
    const receivedRequests = [
        {
            id: 1,
            myProduct: {
                name: "Black Leather Jacket",
                image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=100&h=100&fit=crop",
                category: "men",
                points: 150
            },
            requestedProduct: {
                name: "Blue Denim Jeans",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
                category: "men"
            },
            requestingUser: {
                name: "Alex Smith",
                email: "alex@example.com",
                points: 320,
                rating: 4.5
            },
            status: "pending",
            requestDate: "2024-01-16",
            message: "Hi! I really love your leather jacket. Would you be interested in swapping it for my denim jeans?"
        },
        {
            id: 2,
            myProduct: {
                name: "Vintage Band T-Shirt",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
                category: "men",
                points: 80
            },
            requestedProduct: {
                name: "Casual Sneakers",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
                category: "men"
            },
            requestingUser: {
                name: "Emma Davis",
                email: "emma@example.com",
                points: 150,
                rating: 4.8
            },
            status: "pending",
            requestDate: "2024-01-15",
            message: "Love this vintage tee! My sneakers are barely worn."
        },
        {
            id: 3,
            myProduct: {
                name: "Summer Maxi Dress",
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100&h=100&fit=crop",
                category: "women",
                points: 120
            },
            requestedProduct: {
                name: "Denim Jacket",
                image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=100&h=100&fit=crop",
                category: "women"
            },
            requestingUser: {
                name: "Sophie Wilson",
                email: "sophie@example.com",
                points: 280,
                rating: 4.2
            },
            status: "accepted",
            requestDate: "2024-01-14",
            message: "Perfect for summer! Would love to exchange."
        },
        {
            id: 4,
            myProduct: {
                name: "Kids Batman Costume",
                image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&h=100&fit=crop",
                category: "kid",
                points: 90
            },
            requestedProduct: {
                name: "School Backpack",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
                category: "kid"
            },
            requestingUser: {
                name: "David Brown",
                email: "david@example.com",
                points: 200,
                rating: 4.0
            },
            status: "rejected",
            requestDate: "2024-01-13",
            message: "My son would love this costume!"
        }
    ];

    const handleQueryChange = useCallback((newQuery) => {
        setQuery(newQuery);
    }, []);

    const filteredRequests = useMemo(() => {
        return receivedRequests.filter(request => {
            const matchesQuery = request.myProduct.name.toLowerCase().includes(query.toLowerCase()) ||
                                request.requestedProduct.name.toLowerCase().includes(query.toLowerCase()) ||
                                request.requestingUser.name.toLowerCase().includes(query.toLowerCase());
            
            const matchesFilter = filter === 'all' || request.status === filter;
            
            return matchesQuery && matchesFilter;
        });
    }, [query, filter]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'accepted':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'accepted':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleAcceptSwap = (requestId) => {
        console.log('Accept swap request:', requestId);
    };

    const handleRejectSwap = (requestId) => {
        console.log('Reject swap request:', requestId);
    };

    const handleRedeemViaPoints = (requestId) => {
        console.log('Redeem via points:', requestId);
    };

    return (
        <section className="w-full px-4 py-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Received Swap Requests</h2>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <SearchBar
                                query={query}
                                onQueryChange={handleQueryChange}
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                                    filter === 'all' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('pending')}
                                className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                                    filter === 'pending' 
                                        ? 'bg-yellow-500 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Pending
                            </button>
                            <button
                                onClick={() => setFilter('accepted')}
                                className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                                    filter === 'accepted' 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Accepted
                            </button>
                            <button
                                onClick={() => setFilter('rejected')}
                                className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                                    filter === 'rejected' 
                                        ? 'bg-red-500 text-white' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    My Product
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Offered Product
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Requesting User
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredRequests.map((request) => (
                                <tr key={request.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center min-w-[180px]">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <img
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                    src={request.myProduct.image}
                                                    alt={request.myProduct.name}
                                                />
                                            </div>
                                            <div className="ml-3 overflow-hidden">
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    {request.myProduct.name}
                                                </div>
                                                <div className="text-xs text-gray-500 capitalize truncate">
                                                    {request.myProduct.category} • {request.myProduct.points} pts
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center min-w-[180px]">
                                            <div className="flex-shrink-0 h-12 w-12">
                                                <img
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                    src={request.requestedProduct.image}
                                                    alt={request.requestedProduct.name}
                                                />
                                            </div>
                                            <div className="ml-3 overflow-hidden">
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    {request.requestedProduct.name}
                                                </div>
                                                <div className="text-xs text-gray-500 capitalize truncate">
                                                    {request.requestedProduct.category}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center min-w-[150px]">
                                            <User className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                                            <div className="overflow-hidden">
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    {request.requestingUser.name}
                                                </div>
                                                <div className="text-xs text-gray-500 flex items-center truncate">
                                                    <Star className="h-3 w-3 text-yellow-400 mr-1" />
                                                    {request.requestingUser.rating} • {request.requestingUser.points} pts
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                            {getStatusIcon(request.status)}
                                            <span className="ml-1 capitalize">{request.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(request.requestDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col gap-2">
                                            {request.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAcceptSwap(request.id)}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors"
                                                    >
                                                        <CheckCircle className="h-3 w-3 mr-1" />
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectSwap(request.id)}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                                                    >
                                                        <XCircle className="h-3 w-3 mr-1" />
                                                        Reject
                                                    </button>
                                                    <button
                                                        onClick={() => handleRedeemViaPoints(request.id)}
                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                                                    >
                                                        <Package className="h-3 w-3 mr-1" />
                                                        Redeem ({request.myProduct.points} pts)
                                                    </button>
                                                </>
                                            )}
                                            {request.status !== 'pending' && (
                                                <Link
                                                    to={`/swap-details/${request.id}`}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                                                >
                                                    Details
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredRequests.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No swap requests found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {query ? 'Try adjusting your search terms.' : 'You haven\'t received any swap requests yet.'}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Received;