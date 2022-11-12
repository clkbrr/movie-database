(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader"; */

const PROTO_FILE = './proto/movies.proto';

// Load Proto File
const pkgDefs = protoLoader.loadSync(PROTO_FILE);
// Load Definition into gRPC
const MovieService = grpc.loadPackageDefinition(pkgDefs).MovieService;

// Create the Client
const client = new MovieService(
    "localhost:6566",
    grpc.credentials.createInsecure()
);


// make a call to GetDog
client.MovieService({}, (error, result) => {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
    }
});







},{}]},{},[1]);
