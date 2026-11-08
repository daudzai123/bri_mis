package org.bri.management;

public class RecordNotFoundException extends RuntimeException {

    public RecordNotFoundException(String entity, int id) {
        super(entity + " " + id + " was not found.");
    }
}
