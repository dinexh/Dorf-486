# Smart Village Revolution Portal - System Diagrams

## System Architecture

```mermaid
graph TD
    subgraph Frontend
        NC[Next.js Client]
        RC[React Context]
        MW[Middleware]
        CSS[Custom CSS]
        TN[Toast Notifications]
    end

    subgraph Backend
        NA[Next.js API Routes]
        DB[(MySQL Database)]
        JWT[JWT Auth]
        HC[HTTP Cookies]
    end

    NC --> RC
    NC --> MW
    NC --> CSS
    NC --> TN
    MW --> NA
    NA --> JWT
    JWT --> HC
    NA --> DB
```

## API Routes Structure

```mermaid
graph LR
    subgraph Authentication
        L[/api/auth/login]
        LO[/api/auth/logout]
        C[/api/auth/check]
        FP[/api/auth/forgot-password]
        RP[/api/auth/reset-password]
    end

    subgraph Dashboard
        subgraph Admin
            AM[/api/dashboard/admins]
            CP[/api/dashboard/change-password]
        end

        subgraph Content
            FA[/api/dashboard/focusd]
            AC[/api/dashboard/activities]
            GL[/api/dashboard/gallery]
            AW[/api/dashboard/awards]
        end
    end
```

## Database Schema

```mermaid
erDiagram
    User {
        int id PK
        string name
        string idNumber
        string email
        string password
        string role
        string status
    }

    Domain {
        int id PK
        string name
    }

    FocusAreas {
        int id PK
        int domain_id FK
        string description
        string imageLink
    }

    Activities {
        int id PK
        string name
        date date
        int domain_id FK
        int studentsParticipated
        string reportLink
    }

    Gallery {
        int id PK
        string imageLink
        int domain_id FK
    }

    Awards {
        int id PK
        string image_link
        string description
        date award_date
    }

    Domain ||--o{ FocusAreas : has
    Domain ||--o{ Activities : contains
    Domain ||--o{ Gallery : includes
```

## Frontend Routes Map

```mermaid
graph TD
    subgraph Public
        H[/] --> L[/auth/login]
        H --> FP[/auth/forgot-password]
        H --> AC[/activities]
    end

    subgraph Protected
        D[/dashboard]
        D --> P[/dashboard/profile]
        D --> MA[/dashboard/manage-admins]
        D --> DA[/dashboard/activities]
        D --> DF[/dashboard/focus]
        D --> DG[/dashboard/gallery]
        D --> DAW[/dashboard/awards]
    end

    L --> D
```

## Security Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant M as Middleware
    participant A as API Route
    participant D as Database

    C->>M: Request
    M->>M: Check JWT
    alt Valid Token
        M->>A: Forward Request
        A->>D: Query
        D->>A: Response
        A->>C: Protected Data
    else Invalid Token
        M->>C: Redirect to Login
    end
```

## Error Handling Flow

```mermaid
flowchart TD
    R[Request] --> V{Validation}
    V -->|Invalid| E[Error Response]
    V -->|Valid| P[Process Request]
    P --> S{Success?}
    S -->|Yes| SR[Success Response]
    S -->|No| EH{Error Type}
    EH -->|Client| CE[Client Error - 4xx]
    EH -->|Server| SE[Server Error - 5xx]
    CE --> T[Toast Notification]
    SE --> L[Log Error]
```
